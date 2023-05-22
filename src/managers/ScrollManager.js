export default class ScrollManager {
	constructor (element, onSwipeDown, onSwipeUp, threshold = 50) {
		this.element = element
		this.threshold = threshold
		this.startY = 0
		this.isSwiping = false
		this.onSwipeDown = onSwipeDown
		this.onSwipeUp = onSwipeUp

		this.handleTouchStart = (event) => {
			this.startY = event.touches[0].clientY
		}

		this.handleTouchMove = (event) => {
			const deltaY = event.touches[0].clientY - this.startY

			if (Math.abs(deltaY) > this.threshold) {
				this.isSwiping = true
			}

			if (this.isSwiping) {
				event.preventDefault()
			}
		}

		this.handleTouchEnd = (event) => {
			if (this.isSwiping) {
				const deltaY = event.changedTouches[0].clientY - this.startY

				if (Math.abs(deltaY) > this.threshold) {
					if (deltaY > 0) {
						this.onSwipeUp()
					} else {
						this.onSwipeDown()
					}
				}
				this.startY = 0
				this.isSwiping = false
			}
		}

		this.handleMouseWheel = (event) => {
			if (Math.abs(event.deltaY) > this.threshold) {
				if (event.deltaY > 0) {
					this.onSwipeDown()
				} else {
					this.onSwipeUp()
				}
			}
		}

		if ('ontouchstart' in document.documentElement) {
			// Listen for touch-based swiping events
			this.element.addEventListener('touchstart', this.handleTouchStart)
			this.element.addEventListener('touchmove', this.handleTouchMove)
			this.element.addEventListener('touchend', this.handleTouchEnd)
		} else {
			// Listen for mouse wheel scrolling events
			this.element.addEventListener('wheel', this.handleMouseWheel)
		}
	}
}
