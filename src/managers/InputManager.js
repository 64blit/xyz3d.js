import * as THREE from 'three'
import CameraControls from 'camera-controls'
import RaycastManager from './RaycastManager.js'
import ScrollManager from './ScrollManager.js'
import MathHelpers from '../util/MathHelpers.js'

export default class InputManager
{
	constructor(_THREE, cameraParams)
	{
		if (cameraParams.controls)
		{
			CameraControls.install({ THREE: _THREE })
		}

		this.enabled = true // When false, camera controls are API only, no user interaction allowed
		this.paused = false // When false, camera controls no longer are updated

		this.raycastManager = null
		this.controls = null
		this.camera = null

		this.targetPosition = null
		this.sceneWrapper = null

		this.activeSceneZone

		this.cameraParams = cameraParams
		this.defaultSmoothTime = cameraParams.cameraSmoothTime
		this.defaultRotationDistance = cameraParams.cameraShiftAmount
		this.gyroScale = cameraParams.gyroScale

		this.activeZoneIndex = 0
		this.maxZoneIndex = 999

		this.tiltX = 0
		this.tiltY = 0
		this.maxGyroSignals = 512
		this.tiltXArr = new Array(this.maxGyroSignals).fill(0)
		this.tiltYArr = new Array(this.maxGyroSignals).fill(0)
		this.isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
		this.fitCameraOffset = this.isMobileDevice ? this.cameraParams.cameraFramePadding * 1.05 : this.cameraParams.cameraFramePadding

		this.rotationTarget = new THREE.Vector2()
		this.rotationTargetSmoothed = new THREE.Vector2()
	}

	init(renderer, camera, sceneWrapper, pointerDownCallback, hoverOverCallback, hoverOffCallback, swipeDownCallback, swipeUpCallback)
	{
		this.renderer = renderer
		this.camera = camera
		this.sceneWrapper = sceneWrapper
		this.pointerDownCallback = pointerDownCallback
		this.hoverOverCallback = hoverOverCallback
		this.hoverOffCallback = hoverOffCallback

		this.maxZoneIndex = this.sceneWrapper.wrappedSceneZones.length - 1

		this.activeSceneZone = this.sceneWrapper.getSceneZoneByIndex(this.activeZoneIndex)
		if (!this.activeSceneZone)
		{
			console.error(' ..... Scene zone at index', this.activeZoneIndex, 'not found.')
			return
		}

		if (!this.cameraParams.controls)
		{
			return
		}

		this.scrollManager = new ScrollManager(this.renderer.domElement, swipeDownCallback, swipeUpCallback)

		this.setupGyro()
		this.setupCamera()
		this.setupRaycaster()
		this.resetCamera()
	}

	setupGyro()
	{
		if (this.cameraParams.gyro)
		{
			try
			{
				let gyroscope = new Gyroscope({ frequency: 15 })
				gyroscope.addEventListener('reading', (e) =>
				{
					this.tiltXArr.push(gyroscope.y * this.gyroScale)
					this.tiltYArr.push(gyroscope.x * this.gyroScale)
					this.tiltX = MathHelpers.average(this.tiltXArr)
					this.tiltY = MathHelpers.average(this.tiltYArr)

					if (this.tiltXArr.length > this.maxGyroSignals)
					{
						this.tiltXArr.pop()
						this.tiltYArr.pop()
					}
				})
				gyroscope.start()
			} catch (error)
			{
				console.log('The gryto motion sensor is not supported on this device.', error)
			}
		}
	}

	setupCamera()
	{
		if (!this.activeSceneZone)
		{
			console.error(' ..... Scene zone not found, ensure the zones are properly setup.')
			return
		}

		this.camera.position.lerp(this.activeSceneZone.boxCenter, 1)
		this.camera.lookAt(this.activeSceneZone.lookAtTarget)

		if (!this.cameraParams.controls)
		{
			return
		}

		if (this.controls)
		{
			this.controls.dispose()
		}

		this.controls = new CameraControls(this.camera, this.renderer.domElement)
		this.controls.restThreshold = 0.1

		this.resetControlsLimits()
	}

	resetControlsLimits()
	{
		if (this.cameraParams.orbit === true)
		{
			return
		}

		this.controls.mouseButtons.left = CameraControls.ACTION.NONE
		this.controls.mouseButtons.right = CameraControls.ACTION.NONE
		this.controls.mouseButtons.middle = CameraControls.ACTION.NONE
		this.controls.mouseButtons.wheel = CameraControls.ACTION.NONE
		this.controls.touches.one = CameraControls.ACTION.NONE
		this.controls.touches.two = CameraControls.ACTION.NONE

		this.controls.maxAzimuthAngle = this.controls.azimuthAngle + this.defaultRotationDistance
		this.controls.minAzimuthAngle = this.controls.azimuthAngle - this.defaultRotationDistance
		this.controls.maxPolarAngle = this.controls.polarAngle + this.defaultRotationDistance
		this.controls.minPolarAngle = this.controls.polarAngle - this.defaultRotationDistance
		this.controls.maxDistance = this.controls.distance * 2
		this.controls.maxZoom = this.controls.distance * 2
		this.rotationTarget = new THREE.Vector2(this.controls.azimuthAngle, this.controls.polarAngle)
	}

	setupRaycaster()
	{
		if (!this.activeSceneZone)
		{
			return
		}

		if (this.raycastManager)
		{
			this.raycastManager.dispose()
		}

		const raycasterObjects = this.sceneWrapper.getInteractablesByZone(this.activeSceneZone.zone)
		this.raycastManager = new RaycastManager(raycasterObjects, this.camera, this.renderer.domElement, this.isMobileDevice)
		this.raycastManager.addEventListener('pointerdown', this.onPointerDown.bind(this))
		this.raycastManager.addEventListener('hoveron', this.onHoverOver.bind(this))
		this.raycastManager.addEventListener('hoveroff', this.onHoverOff.bind(this))

		if (window.DEBUG_xyz3d)
		{
			let box3 = this.activeSceneZone.lookAtTargetBox
			const helper = new THREE.Box3Helper(box3, 0xffff00)
			this.sceneWrapper.getScene().add(helper)

			const debugSphere = this.sceneWrapper.getModel('Debug Sphere')
			debugSphere.scale.setScalar(this.activeSceneZone.lookAtTargetSize * 0.05)
			this.raycastManager.addDebugSphere(debugSphere)
		}
	}

	nextSceneZone(direction = 1, dampSpeed = null, damp = true)
	{
		this.activeZoneIndex += direction

		if (this.activeZoneIndex < 0)
		{
			this.activeZoneIndex = 0
		}

		if (this.activeZoneIndex >= this.sceneWrapper.wrappedSceneZones.length)
		{
			this.activeZoneIndex = this.sceneWrapper.wrappedSceneZones.length - 1
		}

		return this.changeSceneZoneByIndex(this.activeZoneIndex, dampSpeed, damp)
	}

	changeSceneZoneByIndex(index, dampSpeed = null, damp = true)
	{
		const newZone = this.sceneWrapper.getSceneZoneByIndex(index)
		this.activeZoneIndex = index

		return this.changeCameraZone(newZone, dampSpeed, damp)
	}

	gotoSceneZone(name, dampSpeed = null, damp = true)
	{
		const newZone = this.sceneWrapper.getSceneZoneByName(name)
		this.activeZoneIndex = newZone.index

		return this.changeCameraZone(newZone.zoneBox, dampSpeed, damp)
	}

	changeCameraZone(zone, dampSpeed = null, damp = true)
	{
		this.activeSceneZone = zone

		if (!this.cameraParams.controls)
		{
			return
		}

		if (!this.controls)
		{
			return
		}

		let cameraDist = this.fitCameraToZone(this.fitCameraOffset)
		this.setInputActive(false)

		if (window.DEBUG_xyz3d)
		{
			this.sceneWrapper.getModel('Debug Sphere')
		}

		this.renderer.domElement.style.cursor = 'auto'

		return this.orbitCameraTo(zone.boxCenter, zone.lookAtTarget, cameraDist, dampSpeed, damp).then(() =>
		{
			this.controls.saveState()
			this.resetControlsLimits()
			this.setInputActive(true)
			this.setupRaycaster()

			this.rotationTargetSmoothed.x = this.controls.azimuthAngle
			this.rotationTargetSmoothed.y = this.controls.polarAngle
		})
	}

	orbitCameraTo(positionTarget, lookTarget, camDist, dampSpeed = null, damp = true)
	{
		if (camDist < positionTarget.distanceTo(lookTarget))
		{
			camDist = positionTarget.distanceTo(lookTarget)
		}

		const newPositionTarget = positionTarget.clone().sub(lookTarget).setLength(camDist).add(lookTarget)

		if (!this.controls)
		{
			return
		}

		this.setDampSpeed(dampSpeed)
		return this.controls.setLookAt(newPositionTarget.x, newPositionTarget.y, newPositionTarget.z, lookTarget.x, lookTarget.y, lookTarget.z, damp)
	}

	// A function to make sure the threejs camera displays the entire bounding box
	fitCameraToZone(offset = 1, minDistance = 0)
	{
		const boxSize = this.activeSceneZone.lookAtTargetSize * 1.15
		let cameraDist = (offset * boxSize) / (2 * Math.atan((Math.PI * this.camera.fov) / 360))

		if (this.camera.aspect < 1)
		{
			cameraDist *= 2
		}

		return cameraDist
	}

	resetCamera(damp = true)
	{
		if (!this.enabled)
		{
			return
		}

		if (this.controls && this.activeSceneZone)
		{
			this.controls.reset(damp)
			this.nextSceneZone(0, damp)
			this.setInputActive(true)
		}
	}

	setInputActive(isActive)
	{
		this.enabled = isActive
		if (this.raycastManager)
		{
			this.raycastManager.enabled = isActive
		}

		if (this.controls)
		{
			this.controls.enabled = isActive
		}
	}

	setPaused(paused)
	{
		this.paused = paused
		this.enabled = !paused
		this.raycastManager.enabled = !paused
	}
	setDampSpeed(dampSpeed = null)
	{
		if (dampSpeed == null)
		{
			dampSpeed = this.defaultSmoothTime
		}

		if (!this.controls)
		{
			return
		}

		this.controls.smoothTime = dampSpeed
	}

	setZoom(zoom, damp = true)
	{
		this.controls.zoomTo(zoom, damp)
	}

	setLookAt(positionTarget, lookTarget, damp = true)
	{
		return this.controls.setLookAt(positionTarget.x, positionTarget.y, positionTarget.z, lookTarget.x, lookTarget.y, lookTarget.z, damp)
	}

	moveCamera(positionTarget, damp = true)
	{
		return this.controls.moveTo(positionTarget.x, positionTarget.y, positionTarget.z, damp)
	}

	setCameraOffset(newOffset)
	{
		this.camera.filmOffset = newOffset
		this.camera.updateProjectionMatrix()
	}

	onPointerDown(event)
	{
		if (event.object === null || !this.enabled)
		{
			return
		}

		this.raycastManager.enabled = false

		this.pointerDownCallback(event.object)
	}

	onHoverOver(event)
	{
		if (event.object === null)
		{
			return
		}

		this.hoverOverCallback(event.object)
	}

	onHoverOff(event)
	{
		if (event.object === null)
		{
			return
		}

		this.hoverOffCallback(event.object)
	}

	rotateCamera(deltaTime)
	{
		if (this.cameraParams.orbit)
		{
			// orbit controls clash with gyro and follow mouse
			return
		}

		// Touch, mouse, pen input only
		const isMouseDown = this.controls.currentAction == 32 || this.controls.currentAction == 1

		let minPos = -1
		let maxPos = 1

		let smoothing = 0.1

		if (!isMouseDown)
		{
			if (this.cameraParams.followMouse && this.raycastManager.pointer.x)
			{
				this.rotationTarget.x = this.raycastManager.pointer.x + this.controls.azimuthAngle
				this.rotationTarget.y = -this.raycastManager.pointer.y + this.controls.polarAngle

				this.rotationTarget.x = MathHelpers.map(
					this.rotationTarget.x,
					this.controls.azimuthAngle + minPos,
					this.controls.azimuthAngle + maxPos,
					this.controls.minAzimuthAngle,
					this.controls.maxAzimuthAngle
				)
				this.rotationTarget.y = MathHelpers.map(
					this.rotationTarget.y,
					this.controls.polarAngle + minPos,
					this.controls.polarAngle + maxPos,
					this.controls.minPolarAngle,
					this.controls.maxPolarAngle
				)
			}

			if (this.isMobileDevice && this.cameraParams.gyro)
			{
				this.rotationTarget.x = this.tiltX + this.controls.azimuthAngle
				this.rotationTarget.y = this.tiltY + this.controls.polarAngle
			}
		} else
		{
			smoothing = 1
			this.rotationTarget.x = this.controls.azimuthAngle
			this.rotationTarget.y = this.controls.polarAngle
		}

		this.rotationTargetSmoothed.x = MathHelpers.lerp(this.rotationTargetSmoothed.x, this.rotationTarget.x, smoothing)
		this.rotationTargetSmoothed.y = MathHelpers.lerp(this.rotationTargetSmoothed.y, this.rotationTarget.y, smoothing)

		if (this.controls.active)
		{
			// Prevent followMouse and gyro when moving camera to scene zone

			return
		}

		this.controls.rotateTo(this.rotationTargetSmoothed.x, this.rotationTargetSmoothed.y, false)
	}

	update(deltaTime)
	{

		if (this.paused)
		{
			return
		}

		if (this.controls === undefined || this.controls === null)
		{
			return
		}

		if (this.raycastManager === undefined || this.raycastManager === null)
		{
			return
		}

		this.raycastManager.update(deltaTime)

		this.rotateCamera(deltaTime)
		this.controls.update(deltaTime)

	}
}
