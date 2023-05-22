import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js'

import { SceneWrapper } from './SceneWrapper.js'
import { JsonParser } from '../util/JsonParser.js'
import * as BaseUtils from '../util/BaseUtils.js'

export default class SceneBuilder
{
  constructor(_scene, _renderer, _camera, _params)
  {
    this.scene = _scene
    this.renderer = _renderer
    this.params = _params
    this.jsonPath = _params.jsonPath
    this.camera = _camera
    this.sceneWrapper

    const dracoLoader = new DRACOLoader()
    // TODO: add a proper decoder library path
    dracoLoader.setDecoderPath(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/jsm/libs/draco/'
    )
    this.gltfLoader = new GLTFLoader()
    this.gltfLoader.setDRACOLoader(dracoLoader)
  }

  getSceneWrapper()
  {
    return this.sceneWrapper
  }

  async readJsonFile(path)
  {
    const parser = new JsonParser()
    const data = await parser.parse(path)
    return data
  }

  async build(progressCallback)
  {
    const json = await this.readJsonFile(this.jsonPath)

    const models = []
    const animations = []

    const lights = await this.addLighting(json.lights, progressCallback)
    const gltfData = await this.addGLTFModel(json.models, progressCallback)

    lights.push(...gltfData.lights)
    models.push(...gltfData.models)
    animations.push(...gltfData.animations)

    this.addDebuggingHelpers(models)

    this.sceneWrapper = new SceneWrapper(models, lights, animations, this.scene, this.params)

    return this.sceneWrapper
  }

  addDebuggingHelpers(models)
  {
    if (!window.DEBUG_xyz3d)
    {
      return;
    }
    const axesHelper = new THREE.AxesHelper(5000)
    this.scene.add(axesHelper)

    const geometry = new THREE.SphereGeometry(0.25, 32, 16)
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      opacity: 0.5
    })
    const sphere = new THREE.Mesh(geometry, material)
    sphere.name = 'Debug Sphere'
    axesHelper.userData = { type: 'bgMesh' }
    sphere.userData = { type: 'bgMesh' }

    this.scene.add(sphere)

    models.push(
      { name: 'axesHelper', model: axesHelper },
      { name: 'Debug Sphere', model: sphere }
    )

  }

  async addGLTFModel(modelsArray, progressCallback)
  {
    const models = []
    const lights = []
    const animations = []

    for (let index = 0; index < modelsArray.length; index++)
    {
      const element = modelsArray[ index ]
      if (element.enabled == false)
      {
        continue
      }

      const progress = function (xhr)
      {
        progressCallback(
          index + 1,
          modelsArray.length,
          // The models load from 50% to 100% of the total progress
          BaseUtils.map((100 * xhr.loaded / xhr.total), 0, 100, 50, 100),
          'Models'
        )
      }

      await this.loadModel(element, progress).then(result =>
      {
        const gltfData = this.processModel(result)
        models.push(...gltfData.models)
        lights.push(...gltfData.lights)
        animations.push(...gltfData.animations)
      })
    }

    if (models.length <= 0)
    {
      console.error(' ..... No enabled models found in json file, make sure enabled: true for at least one model.')
    }

    return { models, lights, animations }
  }


  createModelContainer(element, jsonData)
  {
    const modelContainer = {
      name: element.name,
      model: element
    }

    element.castShadow = jsonData.shadow
    element.receiveShadow = jsonData.shadow

    if (element.material)
    {
      element.material.shadowSide = THREE.BackSide
    }

    element.frustumCulled = jsonData.frustumCulled

    // TODO: Add workflow if this data is empty
    switch (element.userData.type)
    {
      case 'bgMesh':
        break
      case 'interactable':
        window.DEBUG_xyz3d && console.log('..... Interactable detected!', element)
        const html = this.getHtml(jsonData, element.name)
        modelContainer[ 'type' ] = html.type
        modelContainer[ 'content' ] = html.content
        break
      case 'raycastMesh':
        break
      case 'cameraBounds':
        break
      case 'player':
        break
      default:
        break
    }

    return modelContainer
  }

  createLightContainer(type, light, jsonData)
  {
    light.castShadow = jsonData.shadow

    switch (type)
    {
      case 'directional':
        light.bias = jsonData.shadowBias
        light.shadow.radius = jsonData.shadowRadius
        light.normalBbias = jsonData.shadowNormalBias
        light.shadow.mapSize.set(1024, 1024)

        if (window.DEBUG_xyz3d)
        {
          const lightHelper = new THREE.DirectionalLightHelper(light)
          const helper = new THREE.CameraHelper(light.shadow.camera)

          this.scene.add(helper)
          this.scene.add(lightHelper)
        }
        break

      case 'point':
        if (window.DEBUG_xyz3d)
        {
          const lightHelper = new THREE.PointLightHelper(light, 1)
          this.scene.add(lightHelper)
        }
        break

      case 'spot':
        if (window.DEBUG_xyz3d)
        {
          const lightHelper = new THREE.SpotLightHelper(light)
          this.scene.add(lightHelper)
        }
        break

      default:
        break
    }

    const lightContainer = {
      type: type,
      light: light
    }

    return lightContainer
  }

  // NOTE: Blender 18.4 mW == 1 intensity of light source
  //18400
  processModel(model)
  {
    const children = [ ...model.gltf.scene.children ]

    const animations = model.gltf.animations
    const models = []
    const lights = []
    const lightIntensityDivisor = 10000

    window.DEBUG_xyz3d && console.log('Gltf data: ', model.gltf.scene)

    // add children objects to scene
    children.forEach(child =>
    {
      child.traverse(childElement =>
      {
        let element = childElement

        window.DEBUG_xyz3d && console.log(
          '..... Processed:',
          element.name,
          element.userData,
          element
        )


        switch (element.type)
        {
          case 'Mesh':
            models.push(this.createModelContainer(element, model.jsonData))
            break

          case 'Group':
            models.push(this.createModelContainer(element, model.jsonData))
            break

          case 'Object3D':
            models.push(this.createModelContainer(element, model.jsonData))
            break

          case 'PointLight':
            element.intensity /= lightIntensityDivisor
            lights.push(
              this.createLightContainer('point', element, model.jsonData)
            )
            break

          case 'DirectionalLight':
            element.intensity /= 680
            lights.push(
              this.createLightContainer('directional', element, model.jsonData)
            )
            break

          case 'SpotLight':
            element.intensity /= lightIntensityDivisor
            lights.push(
              this.createLightContainer('spot', element, model.jsonData)
            )
            break

          default:
            break
        }
      })
    })
    this.scene.add(model.gltf.scene)
    this.setModelMatrixData(model.gltf.scene, model.jsonData)

    return { models, lights, animations }
  }

  setModelMatrixData(model, jsonData)
  {
    model.position.set(
      model.position.x + jsonData.position.x,
      model.position.y + jsonData.position.y,
      model.position.z + jsonData.position.z
    )

    model.quaternion.set(
      jsonData.rotation.x,
      jsonData.rotation.y,
      jsonData.rotation.z,
      jsonData.rotation.w
    )

    model.scale.set(jsonData.scale.x, jsonData.scale.y, jsonData.scale.z)
  }

  getHtml(json, modelName)
  {
    const htmlData = this.getHtmlData(json, modelName)

    if (htmlData === null || htmlData.content === undefined)
    {
      return { type: '', content: '' }
    }

    if (htmlData.type === 'popup')
    {
      htmlData.content =
        `<iframe id="XYZ3d-fullscreen" src="` + htmlData.content + `"></iframe>`
    }

    return htmlData
  }

  getHtmlData(jsonData, modelName)
  {
    const interactable = jsonData.interactable

    for (let index = 0; index < interactable.length; index++)
    {
      const element = interactable[ index ]
      const strippedName = element.modelName.replace(/\./g, '')

      if (element.modelName === modelName || strippedName === modelName)
      {
        return element
      }
    }

    console.warn(
      'Missing JSON entry for interactable element named: ',
      modelName
    )
    return null
  }

  async loadModel(jsonData, progressCallback)
  {
    return new Promise(resolve =>
    {
      return this.gltfLoader.load(
        jsonData.path,
        // called when loaded gltf
        function (gltf)
        {
          resolve({ gltf, jsonData })
        },
        // called while loading is progressing
        progressCallback,
        // called when loading has errors
        function (error)
        {
          console.log('An error happened ' + error)
        }
      )
    })
  }

  async addLighting(lightsArray, progressCallback)
  {
    const lights = []

    for (let index = 0; index < lightsArray.length; index++)
    {
      const element = lightsArray[ index ]

      const progress = function (xhr)
      {
        progressCallback(
          index + 1,
          lightsArray.length,
          // The lights load from 0% to 50% of the total progress
          BaseUtils.map((100 * xhr.loaded / xhr.total), 0, 100, 0, 50),
          "Textures"
        )
      }

      let position
      let light

      const newLight = {
        type: null,
        light: null
      }

      if (element.enabled === false)
      {
        continue
      }

      switch (element.type)
      {
        case 'hdr':
          await this.addHDR(
            element.path,
            element.backgroundIntensity,
            element.backgroundBlurriness,
            progress
          )
          break

        case 'exr':
          await this.addEXR(
            element.path,
            element.backgroundIntensity,
            element.backgroundBlurriness,
            progress
          )
          break

        case 'pointLight':
          position = new THREE.Vector3(
            element.position.x,
            element.position.y,
            element.position.z
          )
          light = this.addPointLight(
            position,
            element.color,
            element.intensity,
            element.size,
            element.shadow
          )

          newLight[ 'type' ] = 'pointLight'
          newLight[ 'light' ] = light

          break

        case 'directionalLight':
          position = new THREE.Vector3(
            element.position.x,
            element.position.y,
            element.position.z
          )
          const target = new THREE.Vector3(
            element.target.x,
            element.target.y,
            element.target.z
          )

          light = this.addDirectionalLight(
            position,
            target,
            element.color,
            element.intensity,
            element.shadow
          )

          newLight[ 'type' ] = 'directionalLight'
          newLight[ 'light' ] = light

          break

        case 'ambientLight':
          light = this.addAmbientLight(element.color, element.intensity)

          newLight[ 'type' ] = 'ambientLight'
          newLight[ 'light' ] = light

          break

        default:
          break
      }

      lights.push(newLight)
    }

    return lights
  }

  addPointLight(
    position,
    color = 0x000000,
    intensity = 1,
    size = 1500,
    shadow = false
  )
  {
    const light = new THREE.PointLight(color, intensity, size)
    light.position.lerp(position, 1)
    light.castShadow = shadow

    light.bias = jsonData.shadowBias
    light.shadow.radius = jsonData.shadowRadius
    light.normalBbias = jsonData.shadowNormalBias
    light.shadow.mapSize.set(1024, 1024)

    this.scene.add(light)

    if (window.DEBUG_xyz3d)
    {
      const pointLightHelper = new THREE.PointLightHelper(light, 0.25)
      this.scene.add(pointLightHelper)
    }

    return light
  }

  addAmbientLight(color = 0x000000, intensity = 1)
  {
    const light = new THREE.AmbientLight(color, intensity)
    this.scene.add(light)

    return light
  }

  addDirectionalLight(
    position,
    target = new THREE.Vector3(0, 0, 0),
    color = 0xffffff,
    intensity = 2,
    shadow = true
  )
  {
    const light = new THREE.DirectionalLight(color, intensity)
    light.position.lerp(position, 1)
    light.target.position.lerp(target, 1)
    light.castShadow = shadow
    light.bias = jsonData.shadowBias
    light.shadow.radius = jsonData.shadowRadius
    light.normalBbias = jsonData.shadowNormalBias
    light.shadow.mapSize.set(1024, 1024)

    this.scene.add(light)
    this.scene.add(light.target)

    if (window.DEBUG_xyz3d)
    {
      const lightHelper = new THREE.DirectionalLightHelper(light)
      const helper = new THREE.CameraHelper(light.shadow.camera)

      this.scene.add(helper)
      this.scene.add(lightHelper)
    }

    return light
  }

  async addHDR(filePath, intensity, backgroundBlurriness, progress)
  {
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer)
    pmremGenerator.compileEquirectangularShader()
    let envMap
    return new Promise(resolve =>
    {
      return new RGBELoader().load(
        filePath,
        (texture) =>
        {
          envMap = pmremGenerator.fromEquirectangular(texture).texture
          this.scene.environment = envMap
          this.scene.background = envMap
          this.scene.backgroundIntensity = intensity
          this.scene.backgroundBlurriness = backgroundBlurriness
          texture.dispose()
          pmremGenerator.dispose()
          resolve()
        },
        progress)
    })
  }

  async addEXR(filePath, intensity, backgroundBlurriness, progress)
  {
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer)
    pmremGenerator.compileEquirectangularShader()
    let envMap
    return new Promise(resolve =>
    {
      return new EXRLoader().load(
        filePath,
        (texture) =>
        {
          texture.mapping = THREE.EquirectangularReflectionMapping

          envMap = pmremGenerator.fromEquirectangular(texture).texture
          this.scene.environment = envMap
          this.scene.background = envMap
          this.scene.backgroundIntensity = intensity
          this.scene.backgroundBlurriness = backgroundBlurriness
          texture.dispose()
          pmremGenerator.dispose()
          resolve()
        },
        progress)
    })
  }
}
