const address = 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'

export default function TokenChart() {
	return (
		<div className="w-full h-full">
			<iframe
				title="chart"
				width="100%"
				height="550"
				src={`
          https://birdeye.so/tv-widget/${address}?chain=solana&viewMode=pair&chartInterval=1D&chartType=CANDLE&chartTimezone=Europe%2FBerlin&chartLeftToolbar=hide&theme=dark&cssCustomProperties=--tv-color-platform-background%3A%2311141a&cssCustomProperties=--tv-color-pane-background%3A%23f8f8f81a&chartOverrides=paneProperties.backgroundType%3Asolid&chartOverrides=paneProperties.background%3A%2311141a`}
				allowFullScreen
				className="w-full rounded-14 overflow-hidden mb-10"
			/>
		</div>
	)
}

export {
    TokenChart
}
