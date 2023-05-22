import * as THREE from 'three'

export class SceneWrapper
{
	constructor(_models, _lights, _animations, _scene, _params)
	{
		this.animations = _animations
		this.models = _models
		this.lights = _lights
		this.scene = _scene

		this.wrappedModels = {
			interactables: [],
			bgMesh: [],
			player: null,
		}

		this.wrappedAnimations = {
			looping: [],
			onClick: [],
			onHover: [],
			camera: [],
		}

		this.wrappedSceneZones = []

		this.wrapScene(this.models)
		this.updateSceneZones(this.wrappedSceneZones, !_params.camera.orbit)  // we don't need to wrap interactables by zone if we're using orbit controls
	}

	wrapScene(models)
	{
		const wrappedModels = {
			interactables: [],
			bgMesh: [],
			player: null,
		}

		const wrappedZones = []

		for (let index = 0; index < models.length; index++)
		{
			const element = models[ index ]
			const userData = element.model.userData
			let objectWrapper = {}
			const animations = this.findAndSaveAnimations(userData, element.name)

			switch (userData.type)
			{
				case 'interactable':
					objectWrapper = this.getInteractableObject(element, userData, animations)

					wrappedModels[ 'interactables' ].push(objectWrapper)

					break

				case 'cameraBounds':
					objectWrapper = this.getCameraBoundsObject(element, userData)

					wrappedZones.push(objectWrapper)

					break

				case 'bgMesh':
					wrappedModels[ 'bgMesh' ].push(element.model)

					break

				case 'raycastMesh':
					wrappedModels[ 'bgMesh' ].push(element.model)

					break

				case 'player':
					wrappedModels[ 'player' ] = element.model

					break

				default:
					break
			}
		}

		this.wrappedModels = wrappedModels
		this.wrappedSceneZones = wrappedZones
	}

	updateSceneZones(wrappedZones, wrapInteractablesByZone = true)
	{
		const tempZones = [ ...wrappedZones ]

		if (tempZones.length <= 0 && window.DEBUG_xyz3d)
		{
			console.error('Missing scene zone data in model file. Check export settings')
		}

		for (let i = 0; i < tempZones.length; i++)
		{
			const element = tempZones[ i ]
			const center = element.position

			let zoneInteractables = null

			zoneInteractables = this.getInteractableModelsByZone(element.zone)

			let zoneBgModels = this.getBackgroundModelsByZone(element.zone)
			zoneBgModels.forEach((e) =>
			{
				zoneInteractables.push(e)
			})

			const lookAtTargetBox = this.getBoundingBox(zoneInteractables)

			const lookAtTarget = new THREE.Vector3()
			lookAtTargetBox.getCenter(lookAtTarget)
			const lookAtTargetBoxSize = new THREE.Vector3()
			lookAtTargetBox.getSize(lookAtTargetBoxSize)

			tempZones[ i ][ 'boxCenter' ] = center
			tempZones[ i ][ 'lookAtTargetBox' ] = lookAtTargetBox
			tempZones[ i ][ 'lookAtTargetSize' ] = Math.max(lookAtTargetBoxSize.x, lookAtTargetBoxSize.y, lookAtTargetBoxSize.z)
			tempZones[ i ][ 'lookAtTarget' ] = lookAtTarget
		}

		this.wrappedSceneZones = tempZones
	}

	getScene()
	{
		return this.scene
	}

	getSceneZoneByIndex(index)
	{
		let zone = this.wrappedSceneZones[ 0 ]
		this.wrappedSceneZones.forEach((element) =>
		{
			if (element.index === index)
			{
				zone = element
			}
		})

		return zone
	}

	getSceneZoneByName(zone)
	{
		let zoneBox = this.wrappedSceneZones[ 0 ]
		let index = 0
		this.wrappedSceneZones.forEach((element) =>
		{
			if (element.zone === zone)
			{
				zoneBox = element
				index = zoneBox.index
			}
		})

		return { zoneBox, index }
	}


	getWrappedAnimations()
	{
		return this.wrappedAnimations
	}

	getPlayer()
	{
		return this.wrappedModels.player
	}

	getBackgroundModels()
	{
		return this.wrappedModels.bgMesh
	}

	getInterableModels()
	{
		const models = []

		for (let i = 0; i < this.wrappedModels.interactables.length; i++)
		{
			const interactable = this.wrappedModels.interactables[ i ].element.model

			models.push(interactable)
		}

		return models
	}

	getInteractablesByZone(zone)
	{
		const models = []

		for (let i = 0; i < this.wrappedModels.interactables.length; i++)
		{
			const interactable = this.wrappedModels.interactables[ i ]

			if (interactable.zone === zone)
			{
				models.push(interactable)
			}
		}

		return models
	}

	getInteractableModelsByZone(zone)
	{
		const models = []

		for (let i = 0; i < this.wrappedModels.interactables.length; i++)
		{
			const interactable = this.wrappedModels.interactables[ i ]

			if (interactable.zone === zone)
			{
				models.push(interactable.element.model)
			}
		}

		return models
	}

	getBackgroundModelsByZone(zone)
	{
		const models = []

		for (let i = 0; i < this.wrappedModels.bgMesh.length; i++)
		{
			const model = this.wrappedModels.bgMesh[ i ]

			model.traverse((element) =>
			{
				if (element.userData.zone === zone)
				{
					models.push(element)
				}
			})
		}

		return models
	}

	getBoundingBoxByVertices(object)
	{
		const boundingBox = new THREE.Box3()

		object.traverse((child) =>
		{
			if (child.type === 'Mesh')
			{
				const geometry = child.geometry
				geometry.computeBoundingBox()
				let meshPositions = child.geometry.attributes.position
				let verticesWorld = []
				for (let i = 0; i < meshPositions.count; i++)
				{
					const point = new THREE.Vector3().fromBufferAttribute(meshPositions, i) // set p from `position`
					child.localToWorld(point) // p has wordl coords
					boundingBox.expandByPoint(point)
				}

			}
		})

		return boundingBox
	}


	getBoundingBox(models)
	{
		const bbox = new THREE.Box3()

		for (let index = 0; index < models.length; index++)
		{
			const model = models[ index ]
			model.traverse((element) =>
			{
				if (element.geometry)
				{
					element.geometry.computeBoundingBox()
					const box = this.getBoundingBoxByVertices(element)
					bbox.union(box)
				}
			})
		}

		return bbox
	}

	getModel(name)
	{
		if (name === undefined || name === null)
		{
			return
		}

		let strippedName = name.replace(/\./g, '')
		strippedName = strippedName.replace(/\s/g, '_')

		window.DEBUG_xyz3d && console.log(':>> Looking for model named: ', strippedName)

		for (let index = 0; index < this.models.length; index++)
		{
			const element = this.models[ index ].model

			if (element.name === name || element.name === strippedName)
			{
				return element
			}
		}

		return null
	}

	getAnimation(name)
	{
		if (name === undefined || name === null)
		{
			console.warn(' ..... No animation name provided')
			return
		}

		let strippedName = name.replace(/\./g, '')
		strippedName = strippedName.replace(/\s/g, '_')

		window.DEBUG_xyz3d && console.log(':>> Looking for animation named: ', strippedName)

		for (let index = 0; index < this.animations.length; index++)
		{
			const element = this.animations[ index ]

			if (element.name === name || element.name === strippedName)
			{
				return element
			}
		}

		return null
	}

	getAnimationsFromCSV(animationsCSV)
	{
		const names = animationsCSV.split(',')
		const animations = []

		for (let index = 0; index < names.length; index++)
		{
			const element = names[ index ]
			animations.push(this.getAnimation(element))
		}

		return animations
	}

	getAnimationTrack(animationClip, trackName)
	{
		for (let i = 0; i < animationClip.tracks.length; i++)
		{
			if (animationClip.tracks[ i ].name === trackName)
			{
				return animationClip.tracks[ i ]
			}
		}
		return null
	}

	getCameraAnimationStart(animationClip)
	{
		const startData = {
			position: null,
			rotation: null,
		}

		for (let i = 0; i < animationClip.camera.length; i++)
		{
			const element = animationClip.camera[ i ]
			for (let j = 0; j < element.tracks.length; j++)
			{
				const track = element.tracks[ j ]

				if (track.name.includes('.position'))
				{
					startData.position = new THREE.Vector3(track.values[ 0 ], track.values[ 1 ], track.values[ 2 ])
				} else if (track.name.includes('.quaternion'))
				{
					const quaternion = new THREE.Quaternion(track.values[ 0 ], track.values[ 1 ], track.values[ 2 ], track.values[ 3 ])

					// const rotation = new THREE.Euler().setFromQuaternion(quaternion);

					startData.rotation = quaternion
				}
			}
		}

		return startData
	}

	validateAnimations(animationArray)
	{
		for (let index = 0; index < animationArray.length; index++)
		{
			const element = animationArray[ index ]
			if (element === undefined || element === null)
			{
				return false
			}
		}
		return true
	}

	findAndSaveAnimations(userData, name)
	{
		let loopAnimations = null
		let onClickAnimations = null
		let onHoverAnimations = null
		let cameraAnimations = null

		if ('loopAnimations' in userData)
		{
			loopAnimations = this.getAnimationsFromCSV(userData.loopAnimations)

			window.DEBUG_xyz3d && !this.validateAnimations(loopAnimations) && console.warn(' ......  Missing animation data named: ', name)

			this.wrappedAnimations.looping.push({ name, animations: loopAnimations })
		}

		if ('onClickAnimations' in userData)
		{
			onClickAnimations = this.getAnimationsFromCSV(userData.onClickAnimations)

			!this.validateAnimations(onClickAnimations) && window.DEBUG_xyz3d && console.warn(' ......  Missing animation data named: ', name)

			this.wrappedAnimations.onClick.push({ name, animations: onClickAnimations })
		}

		if ('onHoverAnimations' in userData)
		{
			onHoverAnimations = this.getAnimationsFromCSV(userData.onHoverAnimations)

			!this.validateAnimations(onHoverAnimations) && window.DEBUG_xyz3d && console.warn(' ......  Missing animation data named: ', name)

			this.wrappedAnimations.onHover.push({ name, animations: onHoverAnimations })
		}

		if ('cameraAnimations' in userData)
		{
			cameraAnimations = this.getAnimationsFromCSV(userData.cameraAnimations)

			!this.validateAnimations(cameraAnimations) && window.DEBUG_xyz3d && console.warn(' ......  Missing animation data named: ', name)

			this.wrappedAnimations.camera.push({ name, animations: cameraAnimations })
		}

		return { loopAnimations, onHoverAnimations, onClickAnimations, cameraAnimations }
	}

	getInteractableObject(element, userData, animations)
	{
		let raycastTarget = this.getRaycastTarget(userData.raycastTarget)

		if (raycastTarget == null || userData.raycastTarget === undefined || userData.raycastTarget === null)
		{
			raycastTarget = element.model
		}

		const objectWrapper = {
			name: element.name,
			raycastTarget: raycastTarget,
			element: element,
			animations: {},
			zone: userData.zone,
		}

		if (animations.onHoverAnimations !== null)
		{
			objectWrapper.animations[ 'onHover' ] = animations.onHoverAnimations
		}

		if (animations.onClickAnimations !== null)
		{
			objectWrapper.animations[ 'onClick' ] = animations.onClickAnimations
		}

		if (animations.cameraAnimations !== null)
		{
			objectWrapper.animations[ 'camera' ] = animations.cameraAnimations
		}

		return objectWrapper
	}

	getCameraBoundsObject(element, userData)
	{
		const objectWrapper = {
			zone: userData.zone,
			index: parseInt(userData.index, 10),
			position: element.model.position,
		}

		element.model.visible = false

		return objectWrapper
	}

	getRaycastTarget(name)
	{
		const raycastTarget = this.getModel(name)

		if (raycastTarget == null)
		{
			return null
		}

		if (raycastTarget.material !== undefined || raycastTarget.material !== null)
		{
			if (window.DEBUG_xyz3d)
			{
				console.log('Setting the raycast mesh named: ', raycastTarget.name, ' material visibility to false via material.visible = false')
			}
			raycastTarget.material.visible = false
		}

		return raycastTarget
	}
}
