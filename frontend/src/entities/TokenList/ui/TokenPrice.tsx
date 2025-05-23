import { PublicKey } from "@solana/web3.js";
import { formatNumber } from "@shared/lib/formatters/formatNumber";
import { cn } from "@shared/lib/utils/cn";
import { useInstructionsContext } from "@app/context/InstructionsContext/InstructionsContext";
import { useCallback, useEffect, useState } from "react";

type TokenPriceProps = {
	price: number
	change: number
}

function TokenPrice({ price, change }: TokenPriceProps) {


	//getActualPriceAccount
	return (
		<div className="flex items-end text-sm leading-tight justify-center flex-col font-bold w-24">
			<span>${formatNumber(price)}</span>
			<span
				className={cn(
					'text-[10px]',
					change === 0 && 'text-foreground',
					change > 0 && 'text-positive',
					change < 0 && 'text-negative',
				)}
			>
				{change <= 0 ? change.toFixed(2) : `+${change.toFixed(2)}`}%
			</span>
		</div>
	)
}

export {
	TokenPrice
}
