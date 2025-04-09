type BalanceProps = {
	token: string
	amount: number
	amountInUsd: number
}

export const Balance = ({ token, amount, amountInUsd }: BalanceProps) => {
	return (
		<div className="font-medium text-sm mt-[26px] mb-[22px]">
			<div className="flex w-full justify-between">
				<span className="opacity-50">Available balance:</span>

				<span className="font-bold uppercase">
					{amount} {token}
				</span>
			</div>
			<div className="w-full text-right font-bold opacity-50">
				~${amountInUsd}
			</div>
		</div>
	)
}
