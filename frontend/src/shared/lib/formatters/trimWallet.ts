function trimWallet(address: string) {
	return `${address.slice(0, 5)}...${address.slice(-2)}`
}

export {
    trimWallet
}