function formatNumber(value: number) {
	switch (true) {
		case value > 50:
			return value.toFixed(2)
		case value > 1:
			return value.toFixed(3)
		case value > 0.1:
			return value.toFixed(4)
		case value > 0.01:
			return value.toFixed(5)
		case value > 0.001:
			return value.toFixed(6)
		case value > 0.0001:
			return value.toFixed(7)
		case value > 0.00001:
			return value.toFixed(8)
		default:
			return value.toFixed(9)
	}
}

export {
    formatNumber
}