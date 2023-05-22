$(function() {
	let xs = []
	for (var i = 0; i <= 200; i++) {
		xs.push(i)
	}

	let t = 0

	function animate() {

		let points = xs.map(x => {

			let y = 10 + 3 * Math.sin((x + t) / 4)

			return [x, y]
		})

		let path = "M" + points.map(p => {
			return p[0] + "," + p[1]
		}).join(" L")

		$('path').each(function() {
			$(this).attr('d', path);
		})

		t += 0.1

		requestAnimationFrame(animate)
	}

	animate();  
})
