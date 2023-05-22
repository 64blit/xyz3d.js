'strict-mode'
import * as THREE from 'three'
import SceneBuilder from './managers/SceneBuilder.js'
import RenderManager from './managers/RenderManager.js'
import InputManager from './managers/InputManager.js'
import AnimationManager from './managers/AnimationManager.js'
import DOMEditor from './ui/DOMEditor.js'
import Stats from 'stats-js'


/**
 * @private
 */
let XYZ3dConfigDefaults = {
  jsonPath: '',
  domElements: {
    canvas: null,
    popup: null
  },
  camera: {
    controls: true,
    orbit: false,
    followMouse: true,
    gyro: true,
    gyroScale: 20,
    cameraFramePadding: 1,
    cameraSmoothTime: 0.25,
    cameraShiftAmount: 0.05,
    fov: 30,
    postEffects: {
      enabled: true,
      bloom: {
        enabled: true,
        exposure: 1.1,
        threshold: 0.1,
        strength: 1,
        radius: 1
      },
      antialias: {
        enabled: true
      }
    }
  },
  debug: false
}

class XYZ3d
{
  /**
   *
   * 	Creates an instance of XYZ3d, a helper framework for 3D websites.
   * 	@class XYZ3d
   * 	@name XYZ3d
   * 	@param {Object} config - The configuration object for the XYZ3d instance.
   * 	@param {Boolean} config.debug - Enables or disables debugging mode. Defaults to false.
   * 	@param {String} config.jsonPath - The path to the 3D scene created with the blender plugin - see the examples or the bottom of the readme for details on this file.
   * 	@param {Object} config.domElements - The IDs of the HTML elements which are used by the plugin.
   * 	@param {String} config.domElements.canvas - The rendering canvas.
   * 	@param {String} config.domElements.popup - The content popup element. A dom element which has an iframe injected into it based on the json file data. Adds and revmoces the following classes .XYZ3d-hidden and .XYZ3d-visible to hide and show the popup. This dom element can be styled to your liking.
   * 	@param {Object} config.camera - The configuration object for the camera.
   * 	@param {Object} config.camera.controls - Enables or disables the camera controls. Defaults to true.
   * 	@param {Boolean} config.camera.orbit - Enables or disables orbit camera controls. When enabled, gyro and followMouse are disabled automatically. Defaults to false.
   * 	@param {Number} config.camera.cameraShiftAmount - Controls the intensity of X/Y camera movement when orbit is off. Defaults to 0.05.
   * 	@param {Boolean} config.camera.followMouse - Enables or disables camera movement based on hovering pointer position, only for desktop. Defaults to true.
   * 	@param {Boolean} config.camera.gyro - Enables or disables camera movement based on gyroscope movement, only for mobile. Defaults to true.
   * 	@param {Boolean} config.camera.gyroScale - Scales the gyroscope movement of the camera, only for mobile. Defaults to 20.
   * 	@param {Number} config.camera.fov - Controls camera field of view. Defaults to 30.
   * 	@param {Number} config.camera.cameraSmoothTime - Controls camera movement time in seconds. Defaults to 0.25.
   * 	@param {Number} config.camera.cameraFramePadding - Controls the amount of padding from the interactable elements to the sides of the display, to ensure all interactables of the current zone are always in frame. Defaults to 1.
   * 	@param {Object} config.camera.postEffects - The configuration object for post effects.
   * 	@param {Boolean} config.camera.postEffects.enabled - Enables or disables post effects. Defaults to true.
   * 	@param {Object} config.camera.postEffects.bloom - The configuration object for bloom post effects.
   * 	@param {Boolean} config.camera.postEffects.bloom.enabled - Enables or disables bloom post effects. Defaults to true.
   * 	@param {Number} config.camera.postEffects.bloom.exposure - Controls bloom post effects exposure. Defaults to 1.1.
   * 	@param {Number} config.camera.postEffects.bloom.threshold - Controls bloom post effects threshold. Defaults to 0.1.
   * 	@param {Number} config.camera.postEffects.bloom.strength - Controls bloom post effects strength. Defaults to 1.
   * 	@param {Number} config.camera.postEffects.bloom.radius - Controls bloom post effects radius. Defaults to 1.
   * 	@param {Boolean} config.camera.postEffects.antialias - Enables or disables antialiasing post effects. Defaults to true.
   * @example const xyzed = new XYZ3d({
   *		jsonPath: 'scene.json',
   *		domElements: {
   *			canvas: 'main-canvas',
   *			popup: 'popup-content',
   *		}
   *	})
   *
   */
  constructor(
    XYZ3dConfig = {
      jsonPath: '',
      domElements: {
        canvas: '',
        popup: ''
      },
      camera: {
        controls: true,
        orbit: false,
        followMouse: true,
        gyro: true,
        cameraFramePadding: 1,
        fov: 30,
        cameraSmoothTime: 0.25,
        cameraShiftAmount: 0.05,
        postEffects: {
          enabled: true,
          bloom: {
            enabled: true,
            exposure: 1.1,
            threshold: 0.85,
            strength: 1.0,
            radius: 0.1
          },
          antialias: {
            enabled: true
          }
        }
      },
      debug: false
    }
  )
  {
    let scope = this

    let renderManager = null
    let inputManager = null
    let domEditor = null
    let animationManager = null

    let sceneWrapper = null
    let contentType = null
    let dynamicContent = null

    let camera = null
    let clock = null
    let deltaTime = null
    let stats = null
    let isWindowResized = false

    window.DEBUG_xyz3d = XYZ3dConfig.debug



    // ///////////////////// SETUP /////////////////////////////


    async function setup()
    {
      // Fills in any missing parameter values
      validateParameters()
      setupDebuggingTools()

      setupManagers()
      await loadScene()

      // Resets camera and rendering sizes
      reset()
      setupCallbacks()

      // Starts rendering
      update()

      return { camera: renderManager.getCamera(), scene: renderManager.getScene(), renderer: renderManager.getRenderer(), sceneWrapper }
    }

    function setupManagers()
    {
      // Setup managers
      clock = new THREE.Clock()
      renderManager = new RenderManager(
        XYZ3dConfig.domElements.canvas,
        XYZ3dConfig.camera
      )

      // Input manager is what handles raycasting, touch and mouse input
      inputManager = new InputManager(THREE, XYZ3dConfig.camera)

      // Dom editor is what handles changing dom elements on the page
      domEditor = new DOMEditor(XYZ3dConfig.domElements.popup)

    }

    async function loadScene()
    {

      const sceneBuilder = new SceneBuilder(
        renderManager.getScene(),
        renderManager.getRenderer(),
        renderManager.getCamera(),
        XYZ3dConfig
      )

      sceneWrapper = await sceneBuilder.build((step, steps, progressValue, stage) =>
      {
        // Handle loading progress data callback 
        if (scope.onProgressLoading)
        {
          scope.onProgressLoading(step, steps, Math.round(progressValue), stage)
        }
      })

      animationManager = new AnimationManager(
        renderManager.getScene(),
        sceneWrapper.getWrappedAnimations()
      )

      // Setup touch input and callbacks
      inputManager.init(
        renderManager.getRenderer(),
        renderManager.getCamera(),
        sceneWrapper,
        onPointerDown,
        onHoverOver,
        onHoverOff,
        onSwipeDown,
        onSwipeUp
      )
    }

    function validateParameters()
    {
      window.DEBUG_xyz3d && console.log('xyz3d arguments: ', XYZ3dConfig)

      const keys = Object.keys(XYZ3dConfig)

      for (let index = 0; index < keys.length; index++)
      {
        const element = keys[ index ]
        const inputType = typeof XYZ3dConfig[ element ]
        const expectedType = typeof XYZ3dConfigDefaults[ element ]
        if (!(inputType === expectedType))
        {
          console.error(
            'Parameter type mismatch for parameter:',
            element,
            'expecting a',
            typeof XYZ3dConfigDefaults[ element ],
            'got a',
            typeof XYZ3dConfig[ element ]
          )
        }
      }

      // Loads the defaults for the camera parameter
      XYZ3dConfig.camera = {
        ...XYZ3dConfigDefaults.camera,
        ...XYZ3dConfig.camera
      }

      // Loads more defaults, incase parameters are missing
      XYZ3dConfig.camera.postEffects = {
        ...XYZ3dConfigDefaults.camera.postEffects,
        ...XYZ3dConfig.camera.postEffects
      }

      XYZ3dConfig.camera.postEffects.bloom = {
        ...XYZ3dConfigDefaults.camera.postEffects.bloom,
        ...XYZ3dConfig.camera.postEffects.bloom
      }

      XYZ3dConfig.camera.postEffects.antialias = {
        ...XYZ3dConfigDefaults.camera.postEffects.antialias,
        ...XYZ3dConfig.camera.postEffects.antialias
      }
    }

    function setupCallbacks()
    {
      // add support for back on mobile closing the popups
      window.onhashchange = () =>
      {
        if (location.hash == '')
        {
          domEditor.closeDynamicContent(reset)
        } else if (window.history.back)
        {
          window.history.back()
        }
      }

      window.addEventListener('keydown', event =>
      {
        if (event.key == "ArrowLeft")
        {
          console.log("Left key");
        } else if (event.key == "ArrowRight")
        {
          console.log("Right key");
        }
      })

      // let resizeTimeout
      window.addEventListener(
        'resize',
        () =>
        {
          // Resetting in this callback created a memory leak, instancing multiple scenes in the background.
          //   A flag fixes this.
          // clearTimeout(resizeTimeout)
          // resizeTimeout = setTimeout(() =>
          // {
          isWindowResized = true
          // }, 100)
        },
        true
      )

    }

    function setupDebuggingTools()
    {
      if (!window.DEBUG_xyz3d)
      {
        return;
      }

      function addScript(src)
      {
        var s = document.createElement('script')
        s.setAttribute('src', src)
        s.async = true
        document.body.appendChild(s)
      }

      addScript(
        'https://markknol.github.io/console-log-viewer/console-log-viewer.js?align=bottom?minimized=true'
      )
      stats = new Stats()
      stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
      document.body.appendChild(stats.dom)

    }

    // Main loop
    function update()
    {
      window.DEBUG_xyz3d && stats.begin()

      requestAnimationFrame(update)

      if (domEditor.isOverlayActive)
      {
        return
      }

      deltaTime = clock.getDelta()

      scope.onUpdate && scope.onUpdate(deltaTime)

      updateManagers(deltaTime)


      window.DEBUG_xyz3d && stats.end()
    }

    function updateManagers(deltaTime)
    {

      animationManager.update(deltaTime)

      inputManager.update(deltaTime)

      renderManager.render()

      if (isWindowResized)
      {
        reset(false)
        isWindowResized = false
      }
    }
    // //////////////////// end SETUP /////////////////////////////

    // //////////////////// MEMBER FUNCTIONS /////////////////////////////

    function reset(smooth = true)
    {
      renderManager.reset()
      inputManager.resetCamera(smooth)
    }


    function onHoverOver(eventObject)
    {
      if (scope.onHoverOver !== null)
      {
        scope.onHoverOver(eventObject)
      }

      const raycastMesh = eventObject.raycastTarget

      if (raycastMesh == null || !inputManager.enabled)
      {
        return
      }

      window.DEBUG_xyz3d && console.log('Hover Over Event: ', eventObject)

      animationManager.playAnimations('onHover', eventObject.animations)
    }

    function onHoverOff(eventObject)
    {
      if (scope.onHoverOff !== null)
      {
        scope.onHoverOff(eventObject)
      }

      const raycastMesh = eventObject.raycastTarget

      if (raycastMesh == null)
      {
        return
      }
    }

    async function onPointerDown(eventObject)
    {
      inputManager.setPaused(true)

      window.DEBUG_xyz3d && console.log('Pointer Down Event: ', eventObject)


      const cameraPromise = animationManager.playAnimations(
        'camera',
        eventObject.animations,
        false,
        false,
        camera
      )
      const clickPromise = animationManager.playAnimations(
        'onClick',
        eventObject.animations,
        false,
        false
      )

      await Promise.all([ cameraPromise, clickPromise ])

      processClickedModel(eventObject)

      inputManager.setPaused(false)

      if (scope.onPointerDown !== null)
      {
        scope.onPointerDown(eventObject)
      }
    }

    function processClickedModel(eventObject)
    {
      contentType = eventObject.element.type
      dynamicContent = eventObject.element.content

      switch (contentType)
      {
        case 'animation':
          break

        case 'goToNextZone':
          inputManager.nextSceneZone(parseInt(dynamicContent, 10))
          break

        case 'goToZone':
          inputManager.gotoSceneZone(dynamicContent)
          break

        case 'popup':
          domEditor.setDynamicContent(dynamicContent, reset)
          domEditor.showDynamicHTML()
          break

        case 'link':
          domEditor.openLink(dynamicContent)
          reset()
          break

        default:
          break
      }

      dynamicContent = null
      contentType = null
    }

    function onSwipeUp()
    {
      if (scope.onSwipeUp !== null)
      {
        scope.onSwipeUp()
      }
    }

    function onSwipeDown()
    {
      if (scope.onSwipeDown !== null)
      {
        scope.onSwipeDown()
      }
    }


    // ///////////////// API ///////////////////////////

    /**
     *
     *
     * This function moves the camera to a scene zone with the given name. The scene zones correspond to different pages in a website or application. The dampSpeed parameter controls the speed at which the camera moves to the new zone.
     * @name gotoSceneZone
     * @param {String} name - - The name of the scene zone to move to, this is defined inside the blender plugin.
     * @param {number} dampTime - The speed at which the camera lerps to the new zone. defaults to 0.1 seconds
     * @example XYZ3d.gotoSceneZone('About')
     *
     */
    scope.gotoSceneZone = function (name, dampTime = null)
    {
      return inputManager.gotoSceneZone(name, dampTime)
    }

    /**
     *
     * @name nextSceneZone
     * This function moves the camera to the next scene zone based on the index parameter defined in the corresponding 3D editor plugin.
     * @param {Number} increment - the incremental value to move scene zones by, value can be negative or positive. Defaults to 1.
     * @param {number} dampTime - The speed at which the camera lerps to the new zone. defaults to 0.1 seconds
     * @example XYZ3d.nextSceneZone()
     *
     *
     */
    scope.nextSceneZone = function (increment = 1, dampTime = null)
    {
      return inputManager.nextSceneZone(increment, dampTime)
    }

    /**
      *
      * @name sceneZoneIndex
      * The index of the current scene zone.
      *
      */
    scope.sceneZoneIndex = function ()
    {
      return inputManager.activeZoneIndex
    }

    /**
      *
      * @name maxSceneZoneIndex
      * The max index of the scene zones.
      *
      */
    scope.maxSceneZoneIndex = function ()
    {
      return inputManager.maxZoneIndex
    }

    /**
     *
     * @name setup
     * This function runs asynchronous setup.
     *
     * @example XYZ3d.setup()
     *
     */
    scope.setup = setup

    /**
     *
     * @name reset
     * This function resets the camera to the current scene zone position.
     *
     * @example XYZ3d.reset()
     *
     */
    scope.reset = reset

    /**
     * @name onPointerDown
     *
     * This callback function is fired when the pointer down event is fired in the 3D scene. It takes an object argument that contains the intersected 3D model and corresponding HTML content. Only models tagged "interactable" will fire this event when clicked on.
     *
     * @param {object} eventData The intersected 3d model and corresponding html content
     * @example XYZ3d.onPointerDown = (event) => { console.log(event) }
     */
    scope.onPointerDown = null

    /**
     * @name onHoverOver
     *
     * This callback function is fired when the pointer hover event is fired in the 3D scene. It takes an object argument that contains the intersected 3D model and corresponding HTML content. Only models tagged "interactable" will fire this event when hovered over.
     *
     * @param {object} eventData The intersected 3d model and corresponding html content
     * @example XYZ3d.onHoverOver = (event) => { console.log(event) }
     */
    scope.onHoverOver = null

    /**
     * @name onHoverOff
     *
     * This callback function is fired when the pointer hover off event is fired in the 3D scene. It takes an object argument that contains the intersected 3D model and corresponding HTML content. Only models tagged "interactable" will fire this event when hovered off.
     *
     * @param {object} eventData The intersected 3d model and corresponding html content
     * @example XYZ3d.onHoverOff = (event) => { console.log(event) }
     */
    scope.onHoverOff = null

    /**
     * @name onSwipeUp
     *
     * This callback function is fired when an swipe up event is fired in the 3D scene. This is also fired with mouse wheel changes.
     *
     * @example XYZ3d.onSwipeUp = () => { console.log('Swipe up detected') }
     */
    scope.onSwipeUp = null

    /**
     * @name onSwipeDown
     *
     * This callback function is fired when a swipe down event is fired in the 3D scene. This is also fired with mouse wheel changes.
     *
     * @example XYZ3d.onSwipeDown = () => { console.log('Swipe down detected') }
     */
    scope.onSwipeDown = null

    /**
     * @name onUpdate
     *
     * This callback function is fired every frame. It takes a deltaTime parameter that represents the time the previous frame took in seconds.
     *
     * @param {number} deltaTime The time the previous frame took in seconds.
     * @example XYZ3d.onUpdate = (deltaTime) => { console.log(deltaTime) }
     */
    scope.onUpdate = null

    /**
     * @name onProgressLoading
     *
     * This callback function is fired while the scene is loading. It takes three parameters: step (the last count of model loaded), steps (the total models to be loaded), and percent (the percentage loaded of the current model).
     *
     * @param {number} step The model index being loaded.
     * @param {number} steps The total models to be loaded.
     * @param {number} percent The percentage loaded of the current model.
     * @param {string} stage The current stage, value is either "Textures" or "Models".
     * @example XYZ3d.onProgressLoading = (step, steps, percent, stage) => { console.log(step, steps, percent, stage) }
     */
    scope.onProgressLoading = null

    // ///////////////// end API //////////////////////
  }
}

/**
 * @typedef {Object} XYZ3dConfig.jsonContent
 * All the properties of the XYZ3dConfig.jsonContent object are found here. 
 * @example 
 * ``` json
 *    {
 *      "models": [
 *        {
 *          "id": "test 1",
 *          "enabled": true,
 *          "path": "assets/models/city_model.glb",
 *          "position": {
 *            "x": 0,
 *            "y": 0,
 *            "z": 0
 *          },
 *          "scale": {
 *            "x": 1,
 *            "y": 1,
 *            "z": 1
 *          },
 *          "rotation": { , "//comment_rotation": "quaternion rotation",
 *            "x": 0,
 *            "y": 0,
 *            "z": 0,
 *            "w": 0
 *          },
 *          "shadow": true, "//comment_shadow": "sets both castShadow and receiveShadow to this value",
 *          "shadowBias": 0.0005,
 *          "shadowNormalBias": 0.01,
 *          "shadowRadius": 4.0,
 *          "frustumCulled": true,
 *          "interactables": [  , "//comment_interactables": "Assign interaction types here",
 *            {
 *              "type": "link", "//comment_link": "When the listed model (under modelName) is clicked it's animations will play, then the link inside 'content' will be opened in a new tab",
 *              "modelName": "ModelNameGoesHere",
 *              "content": "https://www.ebay.com"
 *            },
 *            {
 *              "type": "popup" , "//comment_popup": "When the listed model (under modelName) is clicked it's animations will play, then the html dom object contained in the domeElements.popup will have the class .XYZ3d-hidden replaced with .XYZ3d-visible",
 *              "modelName": "ModelNameGoesHere",
 *              "content": "pages/about.html"
 *            },
 *            {
 *              "type": "goToNextZone", "//comment_goToNextZone": "When the model is clicked, the camera move to the zoneIndex incremented by the 'content' amount",
 *              "modelName": "ModelNameGoesHere",
 *              "conent": "1" , "//comment_content": "This value can be negative, it's the number of zones to change based on the zone index."
 *            },
 *            {
 *              "type": "goToZone",
 *              "modelName": "ModelNameGoesHere",
 *              "conent": "LandingZone"
 *            }
 *          ]
 *        }
 *      ],
 *      "lights": [ , "//comment_lights": "Lights here are optional, lights inside the gltf file are automatically imported into the scene"
 *        {
 *          "id": "bg hdr",
 *          "type": "hdr",
 *          "enabled": true,
 *          "path": "assets/textures/4k.hdr",
 *          "backgroundIntensity": 1,
 *          "backgroundBlurriness": 0
 *        },
 *        {
 *          "id": "bg exr",
 *          "type": "exr",
 *          "enabled": true,
 *          "path": "assets/textures/4k.exr",
 *          "backgroundIntensity": 1,
 *          "backgroundBlurriness": 0
 *        },
 *        {
 *          "id": "point light 1",
 *          "type": "pointLight",
 *          "enabled": true,
 *          "position": {
 *            "x": 0,
 *            "y": 0.25,
 *            "z": 0
 *          },
 *          "color": "#FFFF00",
 *          "intensity": 1,
 *          "size": 100,
 *          "castShadow": false
 *        },
 *        {
 *          "id": "ambient light 1",
 *          "type": "ambientLight",
 *          "enabled": true,
 *          "color": "#FFFFFF",
 *          "intensity": 1.0
 *        },
 *        {
 *          "id": "dir light 1",
 *          "type": "directionalLight",
 *          "enabled": true,
 *          "position": {
 *            "x": 10,
 *            "y": 10,
 *            "z": 10
 *          },
 *          "target": {
 *            "x": 0,
 *            "y": 0,
 *            "z": 0
 *          },
 *          "color": "#FFFFFF",
 *          "intensity": 1,
 *          "castShadow": false
 *        }
 *      ]
 *    }
 * ```
 */

export { THREE, XYZ3d }
