export class JsonParser {
	async parse (path) {
		let jsonData = null

		await fetch(path)
			.then((x) => x.json())
			.then((data) => {
				jsonData = data
			})

		return jsonData
	}
}
