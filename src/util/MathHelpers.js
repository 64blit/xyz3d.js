export default class MathHelpers
{
	static getRandomRange(min, max)
	{
		return Math.random() * (max - min) + min
	}
	static getRandomIntRange(min, max)
	{
		return Math.round(Math.random() * (max - min) + min)
	}

	static quaternionToVector3(x, y, z, w)
	{
		const x2 = x + x
		const y2 = y + y
		const z2 = z + z
		const xx = x * x2
		const xy = x * y2
		const xz = x * z2
		const yy = y * y2
		const yz = y * z2
		const zz = z * z2
		const wx = w * x2
		const wy = w * y2
		const wz = w * z2

		return {
			x: xy - wz,
			y: yz + wx,
			z: xz - wy,
		}
	}

	static map(value, in_min, in_max, out_min, out_max)
	{
		return ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
	}

	static average(arr)
	{
		let sum = 0
		arr.forEach((element) =>
		{
			sum += element
		})

		return sum / arr.length
	}

	static clamp(val, min, max)
	{
		return
	}

	static lerp(v0, v1, t)
	{
		let val = v0 * (1 - t) + v1 * t
		return val
	}
}
