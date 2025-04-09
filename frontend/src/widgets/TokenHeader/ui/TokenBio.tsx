import { formatNumber } from "@shared/lib/formatters/formatNumber"
import { cn } from "@shared/lib/utils/cn"

export type TokenBioProps = {
	symbol: string
	price: number
	change: number
	token: 'ton' | 'sol'
}

export const TokenBio = ({ symbol, price, change, token }: TokenBioProps) => {
	return (
		<div className="flex items-start leading-none gap-0.5 justify-center flex-col font-bold">
			<span className="uppercase w-20 truncate">{symbol}</span>
			<span
				className={cn(
					'w-20 truncate text-sm uppercase',
					change === 0 && 'text-foreground',
					change > 0 && 'text-positive',
					change < 0 && 'text-negative',
				)}
			>
				{formatNumber(price)} {token}
			</span>
		</div>
	)
}
