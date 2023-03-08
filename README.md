# Z3D.js

An extensible flat file cms with a 3D interface built on Three.js. The easiest way to create fully 3D websites.

Features:

- GLTF file support - including lighting and materials
- Animation support and animation firing callbacks. Animation types include: "looping, onClick, onHover"
- Clickable models that open iframe or popup window
- JSON file for scene configuration and loading dynamic lights/hdr environments
- Custom Blender plugin for rapid development
- Smooth 3D scene navigation with JS APIs - "z3d.changeSceneZoneByName('HomePage')"
- Built in post processing
- Mobile devices supported + gryo based movement
- Easy fallback method for legacy devices
- No database, or complex server setup required. Fully static!
- Three.js "animationLoop" and variables, such as "scene, camera, renderer," exposed for simpler development
- And more! :-)

## API

### Table of Contents

- [new Z3D()][1]
  - [Parameters][2]
  - [Examples][3]
- [changeSceneZoneByName('')][4]
  - [Parameters][5]
  - [Examples][6]
- [nextSceneZone()][7]
  - [Examples][8]
- [setup()][9]
  - [Examples][10]
- [reset()][11]
  - [Examples][12]
- [onPointerDownCallback()][13]
  - [Parameters][14]
  - [Examples][15]
- [onHoverOverCallback()][16]
  - [Parameters][17]
  - [Examples][18]
- [onHoverOffCallback()][19]
  - [Parameters][20]
  - [Examples][21]
- [onUpdate()][22]
  - [Parameters][23]
  - [Examples][24]
- [onProgressLoading()][25]
  - [Parameters][26]
  - [Examples][27]

## new Z3D(z3dConfig)

### Parameters

- `z3dConfig` **[Object][28]**&#x20;

  - `z3dConfig.debug` **[Boolean][29]** Turns on or off debugging which ads an AxisHelper to the scene and logs more details of the scene, this introduces significant startup lag. Default is false.
  - `z3dConfig.jsonPath` **[String][30]** The path of the 3D scene created with the corresponding plugin.
  - `z3dConfig.domElements` **[Object][28]** All html IDs required to link the Threejs componenets.

    - `z3dConfig.domElements.canvasID` **[String][30]** The rendering canvas.
    - `z3dConfig.domElements.iframeID` **[String][30]** The parent dom object for the content iframe.
    - `z3dConfig.domElements.loadingScreenId` **[String][30]** The dom object to destroy once the 3d scene is loaded.

  - `z3dConfig.camera` **[Object][28]** The object containing camera options.

    - `z3dConfig.camera.orbit` **[Boolean][29]** Turns on or off orbit camera controls. When enabled, gyro and followMouse is disabled automatically. Default is false.
    - `z3dConfig.camera.followMouse` **[Boolean][29]** Turns on or off camera movement based on hovering pointer position, only for desktop. Default is true.
    - `z3dConfig.camera.gyro` **[Boolean][29]** Turns on or off camera movement based on gyroscope movement, only for mobile.
    - `z3dConfig.camera.fov` **[String][30]** Controls camera fov, default is 30.
    - `z3dConfig.camera.postEffects` **[Object][28]** Controls post effects.

      - `z3dConfig.camera.postEffects.enabled` **[Boolean][29]** Turns on or off post effects. Default is true.
      - `z3dConfig.camera.postEffects.bloom` **[Object][28]** Controls bloom post effects.

        - `z3dConfig.camera.postEffects.bloom.enabled` **[Boolean][29]** Turns on or off bloom post effects. Default is true.

        - `z3dConfig.camera.postEffects.bloom.exposure` **[Number][31]** Controls bloom post effects exposure. Default is 1.1.
        - `z3dConfig.camera.postEffects.bloom.threshold` **[Number][31]** Controls bloom post effects threshold. Default is 0.1.
        - `z3dConfig.camera.postEffects.bloom.strength` **[Number][31]** Controls bloom post effects strength. Default is 2.
        - `z3dConfig.camera.postEffects.bloom.radius` **[Number][31]** Controls bloom post effects radius. Default is 1.

### Examples

```javascript
const ZED = new Z3D({
	jsonPath: '../../assets/crypto_scene.json',
	debug: false,
	domElements: {
		canvasID: 'main-canvas',
		iframeID: 'iframe-content',
		loadingScreenID: 'loading-screen',
	},
	camera: {
		orbit: false,
		followMouse: true,
		fov: 30,
		gyro: true,
		postEffects: {
			enabled: true,
			bloom: {
				enabled: true,
				exposure: 1.1,
				threshold: 0.1,
				strength: 2,
				radius: 1,
			},
		},
	},
})
```

### Example Scene JSON

```json
{
	"models": [
		{
			"id": "city 1",
			"position": {
				"x": 0,
				"y": 0,
				"z": 0
			},
			"scale": {
				"x": 1,
				"y": 1,
				"z": 1
			},
			"rotation": {
				"x": 0,
				"y": 0,
				"z": 0,
				"w": 0
			},
			"castShadow": true,
			"receiveShadow": true,
			"path": "/assets/models/city_model.glb",
			"interactablesContent": [
				{
					"type": "link",
					"modelName": "Button_OpenStore",
					"content": "https://www.ebay.com"
				},
				{
					"type": "iframe",
					"modelName": "Button_AboutUs",
					"content": "pages/about.html"
				},
				{
					"type": "buttonNextZone",
					"modelName": "Button_GoToNextZone",
					"conent": "1"
				},
				{
					"type": "buttonZone",
					"modelName": "LandingZoneLabelModel",
					"conent": "LandingZone"
				}
			]
		}
	],
	"lights": [
		{
			"id": "point light 1",
			"type": "pointLight",
			"position": {
				"x": 0,
				"y": 0.25,
				"z": 0
			},
			"color": "#FFFF00",
			"intensity": 1,
			"size": 100,
			"castShadow": false
		},
		{
			"id": "ambient light 1",
			"type": "ambientLight",
			"color": "#FFFFFF",
			"intensity": 1.0
		},
		{
			"id": "dir light 1",
			"type": "directionalLight",
			"position": {
				"x": 10,
				"y": 10,
				"z": 10
			},
			"target": {
				"x": 0,
				"y": 0,
				"z": 0
			},
			"color": "#FFFFFF",
			"intensity": 1,
			"castShadow": false
		},
		{
			"id": "bg hdr",
			"type": "hdr",
			"path": "/assets/textures/bg.hdr",
			"backgroundIntensity": 1,
			"backgroundBlurriness": 0
		},
		{
			"id": "bg exr",
			"type": "exr",
			"path": "/assets/textures/1k.exr",
			"backgroundIntensity": 1,
			"backgroundBlurriness": 0
		}
	]
}
```

## changeSceneZoneByName

Moves the camera to the provided scene zone. Scene zones correspond to different pages in a site
such as a "Home Page," or an "Ecommerce Storefront"

### Parameters

- `name` **[String][30]** \* The name of the scene zone to move to, this is defined inside the blender plugin.
- `dampSpeed` **[number][31]** The speed at which the camera lerps to the new zone. (optional, default `0.01`)

### Examples

```javascript
z3d.changeSceneZoneByName('About')
```

## nextSceneZone

Moves the camera to the next scene zone - this is defined by the index parameter inside the corresponding 3d editor plugin.

### Examples

```javascript
z3d.nextSceneZone()
```

## setup

Runs asynchronous setup.

### Examples

```javascript
z3d.setup()
```

## reset

Resets the camera to the current scene zone position.

### Examples

```javascript
z3d.reset()
```

## onPointerDownCallback

The callback function for when the pointer down event is fired in the 3d scene.

### Parameters

- `eventData` **[object][28]** The intersected 3d model and corresponding html content

### Examples

```javascript
z3d.onPointerDownCallback = (event) => {
	console.log(event)
}
```

## onHoverOverCallback

The callback function for when the pointer hover event is fired in the 3d scene.

### Parameters

- `eventData` **[object][28]** The intersected 3d model and corresponding html content

### Examples

```javascript
z3d.onHoverOverCallback = (event) => {
	console.log(event)
}
```

## onHoverOffCallback

The callback function for when the pointer hover off event is fired in the 3d scene.

### Parameters

- `eventData` **[object][28]** The intersected 3d model and corresponding html content

### Examples

```javascript
z3d.onHoverOffCallback = (event) => {
	console.log(event)
}
```

## onUpdate

The callback function fired every frame

### Parameters

- `deltaTime` **[number][31]** The time the previous frame took in seconds.

### Examples

```javascript
z3d.onUpdate = (deltaTime) => {
	console.log(deltaTime)
}
```

## onProgressLoading

The callback function fired while the scene is loading.

### Parameters

- `step` **[number][31]** The model index being loaded.
- `steps` **[number][31]** The total models to be loaded.
- `percent` **[number][31]** The percentage loaded of the current model.

### Examples

```javascript
z3d.onProgressLoading = (step, steps, percent) => {
	console.log(step, steps, percent)
}
```

[1]: #z3d
[2]: #parameters
[3]: #examples
[4]: #changescenezonebyname
[5]: #parameters-1
[6]: #examples-1
[7]: #nextscenezone
[8]: #examples-2
[9]: #setup
[10]: #examples-3
[11]: #reset
[12]: #examples-4
[13]: #onpointerdowncallback
[14]: #parameters-2
[15]: #examples-5
[16]: #onhoverovercallback
[17]: #parameters-3
[18]: #examples-6
[19]: #onhoveroffcallback
[20]: #parameters-4
[21]: #examples-7
[22]: #onupdate
[23]: #parameters-5
[24]: #examples-8
[25]: #onprogressloading
[26]: #parameters-6
[27]: #examples-9
[28]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object
[29]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean
[30]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String
[31]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number
