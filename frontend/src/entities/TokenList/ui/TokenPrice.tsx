import { PublicKey } from "@solana/web3.js";
import { formatNumber } from "@shared/lib/formatters/formatNumber";
import { cn } from "@shared/lib/utils/cn";
import { useInstructionsContext } from "@app/context/InstructionsContext/InstructionsContext";
import { useCallback, useEffect, useState } from "react";

export type TokenPriceProps = {
	marketAccount: PublicKey
}

type AccountData = {
	price: number
	change: number
}

function TokenPrice({ marketAccount }: TokenPriceProps) {
	const [currentPrice, setCurrentPrice] = useState<AccountData>({
		price: 0,
		change: 0,
	});


	const {suppliedTokenInstructions} = useInstructionsContext();

	const handleGetActualPriceAccount = useCallback(async () => {
		const currentPrice = await suppliedTokenInstructions?.getActualPriceAccount(marketAccount);
 
		setCurrentPrice({
			 price: currentPrice || 0,
			 change: 0
		})
	 }, [])

	useEffect(() => {
		handleGetActualPriceAccount()

		// setInterval(() => {
		//     handleGetActualPriceAccount()
		// }, 5000);
	}, [])

	//getActualPriceAccount
	return (
		<div className="flex items-end text-sm leading-tight justify-center flex-col font-bold w-24">
			<span>${formatNumber(currentPrice.price)}</span>
			<span
				className={cn(
					'text-[10px]',
					currentPrice.change === 0 && 'text-foreground',
					currentPrice.change > 0 && 'text-positive',
					currentPrice.change < 0 && 'text-negative',
				)}
			>
				{currentPrice.change <= 0 ? currentPrice.change.toFixed(2) : `+${currentPrice.change.toFixed(2)}`}%
			</span>
		</div>
	)
}

export {
	TokenPrice
}
