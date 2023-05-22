import * as THREE from 'three'

const raycaster = new THREE.Raycaster()
export default class RaycastManager extends THREE.EventDispatcher
{
	constructor(_objects, _camera, _domElement, _isMobileDevice)
	{
		super()

		this._objects = _objects
		this._camera = _camera
		this._domElement = _domElement

		this._selected = null
		this._hovered = null
		this._minHoverTime = _isMobileDevice ? 1 : 4

		this._intersections = []
		this._debugSphere

		// API
		this.fps = 30
		this.enabled = true
		this.transformGroup = false
		this.halfWindowWidth = window.innerWidth / 2
		this.halfWindowWidth = window.innerHeight / 2
		this.frame = 0
		this._lastFrameMouseMoved
		this.intersectableObjects = this.getIntersectableObjects(this._objects)

		this.pointer = new THREE.Vector2()

		this.onPointerMove = (event) =>
		{
			if (this.enabled === false)
			{
				return
			}

			this._lastFrameMouseMoved = this.frame

			this.updatePointer(event)

			raycaster.setFromCamera(this.pointer, this._camera)

			if (this.intersectableObjects == null)
			{
				this.intersectableObjects = getIntersectableObjects(this._objects)
			}

			// hover support
			if (event.pointerType === 'mouse' || event.pointerType === 'pen' || event.pointerType === 'touch')
			{
				this._intersections.length = 0

				raycaster.setFromCamera(this.pointer, this._camera)
				raycaster.intersectObjects(this.intersectableObjects, false, this._intersections)

				if (this._intersections.length > 0)
				{
					let object = this._intersections[ 0 ].object

					window.DEBUG_xyz3d && this._debugSphere.position.copy(this._intersections[ 0 ].point)

					object = this.getHitObject(object.name)

					// Hovered off old object
					if (this._hovered !== object && this._hovered !== null)
					{
						this.dispatchEvent({
							type: 'hoveroff',
							object: this._hovered,
						})

						this._domElement.style.cursor = 'grab'
						this._hovered = null
					}

					// Hovered on new object
					if (this._hovered !== object)
					{
						this.dispatchEvent({
							type: 'hoveron',
							object: object,
						})

						this._domElement.style.cursor = 'pointer'
						this._hovered = object
					}
				} else
				{
					// Hovering over no object
					if (this._hovered !== null)
					{
						this.dispatchEvent({
							type: 'hoveroff',
							object: this._hovered,
						})

						this._domElement.style.cursor = 'grab'
						this._hovered = null
					}
				}
			}
		}

		this.onPointerUp = (event) =>
		{
			if (this.enabled === false)
			{
				return
			}

			if (typeof event === TouchEvent && event.touches.length > 1)
			{
				return
			}

			const hoverTime = this.frame - this._lastFrameMouseMoved
			const minTime = Math.min(this.fps, this._minHoverTime)

			if (hoverTime < minTime)
			{
				window.DEBUG_xyz3d && console.log('Click discarded, mouse detected as moving for ', hoverTime, ' frames <', Math.min(this.fps, this._minHoverTime))
				return
			}
			window.DEBUG_xyz3d && console.log('Click registered: ', hoverTime, '<', minTime)

			if (this.intersectableObjects == null || this.intersectableObjects == undefined)
			{
				this.intersectableObjects = getIntersectableObjects(this._objects)
			}

			this._domElement.style.touchAction = 'none'

			this.updatePointer(event)

			this._intersections.length = 0

			raycaster.setFromCamera(this.pointer, this._camera)
			raycaster.intersectObjects(this.intersectableObjects, false, this._intersections)

			if (this._intersections.length > 0)
			{
				const object = this._intersections[ 0 ].object

				this._selected = this.getHitObject(object.name)

				this.dispatchEvent({ type: 'pointerdown', object: this._selected })

				// if (this._hovered != null) {
				//     this.dispatchEvent({
				//         type: 'hoveroff',
				//         object: this._hovered,
				//     });
				// }

				this._hovered = this._selected

				// this.dispatchEvent({
				//     type: 'hoveron',
				//     object: this._selected,
				// });
			}
		}

		this.activate()
	}

	activate()
	{
		this._domElement.addEventListener('pointermove', this.onPointerMove)
		this._domElement.addEventListener('touchend', this.onPointerUp)
		this._domElement.addEventListener('mouseup', this.onPointerUp)
	}

	deactivate()
	{
		this._domElement.removeEventListener('pointermove', this.onPointerMove)
		this._domElement.removeEventListener('touchend', this.onPointerUp)
		this._domElement.removeEventListener('mouseup', this.onPointerUp)
		this._domElement.style.cursor = ''
	}

	updatePointer(event)
	{
		const rect = this._domElement.getBoundingClientRect()

		this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
		this.pointer.y = (-(event.clientY - rect.top) / rect.height) * 2 + 1
	}

	dispose()
	{
		this.deactivate()
	}

	getObjects()
	{
		return this._objects
	}

	getIntersectableObjects(models)
	{
		const retVal = []

		for (let index = 0; index < models.length; index++)
		{
			const element = models[ index ]

			retVal.push(element.raycastTarget)
		}

		return retVal
	}

	getHitObject(name)
	{
		for (let index = 0; index < this._objects.length; index++)
		{
			const element = this._objects[ index ]

			if (element.raycastTarget.name === name)
			{
				return element
			}
		}

		return null
	}

	addDebugSphere(sphere)
	{
		this._debugSphere = sphere
	}

	update(deltaTime)
	{
		this.fps = deltaTime * 1000
		this.frame += 1

		if (this.frame >= Math.MAX_SAFE_INTEGER)
		{
			this.frame = 0
		}
	}
}
