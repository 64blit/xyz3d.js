export default function CustomHmr()
{
	return {
		name: 'custom-hmr',
		enforce: 'post',
		// HMR
		handleHotUpdate({ file, server })
		{
			if (file.includes('dist/'))
			{
				return
			}

			server.ws.send({
				type: 'full-reload',
				path: '*',
			})
		},
	}
}
