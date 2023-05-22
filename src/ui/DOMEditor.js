export default class DOMEditor
{
	constructor(popup)
	{
		this.isOverlayActive = false
		this.hiddenSelector = 'XYZ3d-hidden'
		this.visibleSelector = 'XYZ3d-visible'

		this.contentContainer = popup

		if (!this.contentContainer)
		{
			console.error(' ..... Popup container found. Make sure this is the correct element: ', popup)
		}
	}

	pushHashURL(newHash = '', saveInHistory = true)
	{
		if (window.history.pushState && saveInHistory)
		{
			window.history.pushState(null, null, newHash)
		} else
		{
			location.hash = newHash
		}
	}

	showDynamicHTML(isActive = true)
	{
		this.isOverlayActive = isActive
		if (isActive)
		{
			this.contentContainer.classList.add(this.visibleSelector)
			this.contentContainer.classList.remove(this.hiddenSelector)
		} else
		{
			this.contentContainer.classList.add(this.hiddenSelector)
			this.contentContainer.classList.remove(this.visibleSelector)
			this.pushHashURL('', false)
		}
	}

	setDynamicHTML(htmlContent)
	{
		this.contentContainer.innerHTML = htmlContent
	}

	addDynamicCloseButton(closeCallback)
	{
		let closeBtnElement = `<div id="XYZ3d-close-btn" class="XYZ3d-close-btn"><span>✕</span></div>`
		this.contentContainer.insertAdjacentHTML('beforeend', closeBtnElement)

		closeBtnElement = this.contentContainer.querySelector('#XYZ3d-close-btn')

		closeBtnElement.addEventListener('click', () =>
		{
			this.showDynamicHTML(false)
			closeCallback()
		})
	}

	setDynamicContent(content, callback, urlHash)
	{
		this.setDynamicHTML(content)
		this.addDynamicCloseButton(callback)

		this.pushHashURL(urlHash)
	}

	openLink(link)
	{
		window.open(link) //, '_blank', 'noreferrer'
	}

	closeDynamicContent(callback)
	{
		const closeButton = this.contentContainer.querySelector('.XYZ3d-close')

		if (closeButton)
		{
			callback()
			this.contentContainer.innerHTML = ''
		}
	}
}
