import * as THREE from 'three'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js'

export default class RenderManager
{
	constructor(canvas, params)
	{
		THREE.Cache.enabled = true
		this.canvas = canvas

		if (!this.canvas)
		{
			console.error(' ..... Canvas not found. Make sure this element is valid:, ', canvas)
		}

		this.cameraParams = params
		this.bloomParams = params.postEffects.bloom
		this.isPostEffectsEnabled = params.postEffects.enabled
		this.isBloomEnabled = params.postEffects.bloom.enabled && this.isPostEffectsEnabled
		this.isAntialiasEnabled = params.postEffects.antialias.enabled && this.isPostEffectsEnabled

		if (this.isAntialiasEnabled)
		{
			this.width = this.canvas.clientWidth * 2
			this.height = this.canvas.clientHeight * 2
		}
		else
		{
			this.width = this.canvas.clientWidth
			this.height = this.canvas.clientHeight
		}

		this.camera = new THREE.PerspectiveCamera(this.cameraParams.fov, this.width / this.height, 0.1, 10000)
		this.camera.name = 'Camera'
		this.scene = new THREE.Scene()
		this.renderer
		this.finalComposer
		this.bloomPass

		this.setupRenderer()

		if (!this.isPostEffectsEnabled)
		{
			return
		}

		this.setupPostEffects()
	}

	getCamera()
	{
		return this.camera
	}

	getScene()
	{
		return this.scene
	}

	getRenderer()
	{
		return this.renderer
	}

	setupRenderer()
	{
		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			powerPreference: 'high-performance',
			failIfMajorPerformanceCaveat: true,
			antialias: this.isAntialiasEnabled,
		})
		this.renderer.shadowMap.enabled = true
		this.renderer.toneMapping = THREE.NoToneMapping

		this.camera.layers.enableAll()

		this.renderer.setSize(this.width, this.height)
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
	}

	// TODO: modularize post effects and split this into multiple functions
	setupPostEffects()
	{
		const renderScene = new RenderPass(this.scene, this.camera)

		const bloomPass = new UnrealBloomPass(new THREE.Vector2(this.width, this.height), this.bloomParams.strength, this.bloomParams.radius, this.bloomParams.threshold)

		bloomPass.exposure = this.bloomParams.exposure
		bloomPass.threshold = this.bloomParams.threshold
		bloomPass.strength = this.bloomParams.strength
		bloomPass.radius = this.bloomParams.radius

		const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader)

		this.finalComposer = new EffectComposer(this.renderer)
		this.finalComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		this.finalComposer.setSize(this.width, this.height)

		this.renderer.domElement.style.width = this.width;
		this.renderer.domElement.style.height = this.height;
		this.renderer.domElement.width = this.width * 2
		this.renderer.domElement.height = this.height * 2

		this.finalComposer.addPass(renderScene)

		this.finalComposer.addPass(gammaCorrectionPass)

		this.finalComposer.addPass(bloomPass)


		if (this.renderer.getPixelRatio() === 1 && this.renderer.capabilities.isWebGL2 && this.isAntialiasEnabled)
		{
			const smaaPass = new SMAAPass()
			this.finalComposer.addPass(smaaPass)

		} else if (window.DEBUG_xyz3d)
		{
			console.log(
				'SMAA disabled/ ',
				' pixel ratio != 1? ',
				this.renderer.getPixelRatio() != 1,
				' is webgl2 enabled? ',
				this.renderer.capabilities.isWebGL2,
				' is antialiasing parameter disabled? ',
				!this.isAntialiasEnabled
			)
		}



		bloomPass.enabled = this.isBloomEnabled
	}

	onWindowResized()
	{
		this.width = this.canvas.clientWidth
		this.height = this.canvas.clientHeight

		this.camera.aspect = this.width / this.height
		this.camera.updateProjectionMatrix()

		this.renderer.setSize(this.width, this.height)

		this.renderer.domElement.style.width = this.width;
		this.renderer.domElement.style.height = this.height;
		this.renderer.domElement.width = this.width * 2
		this.renderer.domElement.height = this.height * 2

		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

		if (!this.isPostEffectsEnabled)
		{
			return
		}

		this.finalComposer.setSize(this.width, this.height)
		this.finalComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
	}

	reset()
	{
		this.onWindowResized()
	}

	render()
	{
		if (this.isPostEffectsEnabled)
		{
			this.finalComposer.render()
		} else
		{
			this.renderer.render(this.scene, this.camera)
		}
	}
}
