import * as THREE from 'three'
import * as BaseUtils from '../util/BaseUtils'

export default class AnimationManager
{
	constructor(scene, animations)
	{

		this.animationMixer = new THREE.AnimationMixer(scene)

		this.runningAnimations = []
		this.animations = animations

		// Start looping animations
		this.playAnimations('looping', this.getLoopingAnimations())

		this.animationMixer.addEventListener('finished', e =>
		{
			this.runningAnimations = BaseUtils.removeItemOnce(
				this.runningAnimations,
				e.action._propertyBindings[ 0 ].binding.node.name
			)
		})
	}

	getLoopingAnimations()
	{
		const animations = { looping: [] }
		this.animations.looping.forEach((loopingObjects) =>
		{
			loopingObjects.animations.forEach((e) =>
			{
				animations.looping.push(e)
			})
		})

		return animations
	}

	async playAnimations(
		type,
		animations,
		loop = false,
		pauseOnFinish = false,
		rootObject = null
	)
	{

		const isObjEmpty = (obj) =>
		{
			return Object.keys(obj).length === 0
		}

		if (isObjEmpty(animations) === true)
		{
			return
		}

		// animation of type exists
		if (!(type in animations))
		{
			return
		}

		const animationPromise = this.playAnimationArray(
			animations[ type ],
			rootObject,
			loop,
			pauseOnFinish
		)

		return animationPromise
	}

	async playAnimationArray(
		animations,
		object = null,
		loop = false,
		pauseOnFinish = false
	)
	{
		let maxDuration = 0

		for (let i = 0; i < animations.length; i++)
		{
			const clip = animations[ i ]

			if (!clip)
			{
				continue
			}

			const clipAciton = this.animationMixer.clipAction(clip, object)
			const clipRootName = clipAciton._propertyBindings[ 0 ].binding.node.name
			const activeAnimationIndex = this.runningAnimations.indexOf(clipRootName)

			// Only play clip if it's not currently running
			if (clipAciton.isRunning())
			{
				break
			}

			// store clipAction if another animation isnt currently running on the target object
			if (activeAnimationIndex <= -1)
			{
				this.runningAnimations.push(clipRootName)
			} else
			{
				// another animation is currently running on the target object, so stop it
				this.animationMixer._actions.forEach((action) =>
				{
					// if the same object is targeted by another animation, stop that animation
					if (
						clipAciton._propertyBindings[ 0 ].binding.node === action._propertyBindings[ 0 ].binding.node
						&& action._clip.name !== clipAciton._clip.name
						&& action.isRunning()
					)
					{
						action.stop()
					}
				})
			}

			clipAciton.zeroSlopeAtEnd = true
			clipAciton.zeroSlopeAtStart = true

			if (!loop)
			{
				clipAciton.setLoop(THREE.LoopOnce)
				clipAciton.reset()
			}

			clipAciton.clampWhenFinished = pauseOnFinish

			clipAciton.play()

			if (clip.duration > maxDuration)
			{
				maxDuration = clip.duration
			}
		}

		return new Promise(resolve =>
		{
			return setTimeout(() =>
			{
				resolve()
			}, maxDuration * 1000)
		})
	}

	update(deltaTime)
	{
		this.animationMixer.update(deltaTime)
	}
}
