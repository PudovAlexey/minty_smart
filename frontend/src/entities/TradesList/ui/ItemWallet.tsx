export type ItemWalletProps = {
	wallet: string
}

export const ItemWallet = ({ wallet }: ItemWalletProps) => {
	return (
		<div className="opacity-50 w-[66px]">
			{wallet.slice(0, 5)}...{wallet.slice(-2)}
		</div>
	)
}
