import * as THREE from 'three'

export function drawTestLine(scene, pointA, direction)
{
	// var pointA = new THREE.Vector3( 0, 0, 0 );
	// var direction = new THREE.Vector3( 10, 0, 0 );
	direction.normalize()

	const distance = 100 // at what distance to determine pointB

	const pointB = new THREE.Vector3()
	pointB.addVectors(pointA, direction.multiplyScalar(distance))

	const geometry = new THREE.Geometry()
	geometry.vertices.push(pointA)
	geometry.vertices.push(pointB)
	const material = new THREE.LineBasicMaterial({
		color: 0xff0000,
	})
	const line = new THREE.Line(geometry, material)
	scene.add(line)
}

export function map(num, in_min, in_max, out_min, out_max)
{
	return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}

export function lerp(v0, v1, t)
{
	return v0 * (1 - t) + v1 * t
}

export function isVectorEqual(start, end, epsilon = 1)
{
	return Math.abs(end.x - start.x) < epsilon && Math.abs(end.y - start.y) < epsilon && Math.abs(end.z - start.z) < epsilon
}

export function isEqual(a, b)
{
	return Math.abs(a - b) < 1
}

export function sortByDist(a, b)
{
	if (a.dist < b.dist) return -1
	if (a.dist > b.dist) return 1
	return 0
}

export function consoleLogObject(obj, lines = [], isLast = true, prefix = '')
{
	const localPrefix = isLast ? '└─' : '├─'
	lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`)
	const dataPrefix = obj.children.length ? (isLast ? '  │ ' : '│ │ ') : isLast ? '    ' : '│   '
	lines.push(`${prefix}${dataPrefix}  pos: ${this._dumpVec3(obj.position)}`)
	lines.push(`${prefix}${dataPrefix}  rot: ${this._dumpVec3(obj.rotation)}`)
	lines.push(`${prefix}${dataPrefix}  scl: ${this._dumpVec3(obj.scale)}`)
	const newPrefix = prefix + (isLast ? '  ' : '│ ')
	const lastNdx = obj.children.length - 1
	obj.children.forEach((child, ndx) =>
	{
		const isLast = ndx === lastNdx
		this._dumpObject(child, lines, isLast, newPrefix)
	})
	return lines
}

export function dumpVec3(v3, precision = 3)
{
	return `${v3.x.toFixed(precision)}, ${v3.y.toFixed(precision)}, ${v3.z.toFixed(precision)}`
}

export function removeItemOnce(arr, value)
{
	var index = arr.indexOf(value)
	if (index > -1)
	{
		arr.splice(index, 1)
	}
	return arr
}

export function clamp(num, min = 0, max = 100)
{
	return Math.min(Math.max(num, min), max);
}
