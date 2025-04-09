import { cn } from "@shared/lib/utils/cn"

type BuySellButtonProps = {
	action: 'buy' | 'sell'
	setAction: (action: 'buy' | 'sell') => void
}

export const BuySellButton = ({ action, setAction }: BuySellButtonProps) => {
	return (
		<div className="h-[52px] w-full flex justify-between p-1 bg-input rounded-full border border-foreground/5 mb-5">
			{['buy', 'sell'].map((text) => (
				<button
					type="button"
					onClick={() => setAction(text as 'buy' | 'sell')}
					key={text}
					className={cn(
						'w-full flex items-center justify-center font-bold capitalize rounded-full opacity-50',
						action === 'buy' &&
							text === 'buy' &&
							'text-positive bg-positive/20 opacity-100',
						action === 'sell' &&
							text === 'sell' &&
							'text-negative bg-negative/20 opacity-100',
					)}
				>
					{text}
				</button>
			))}
		</div>
	)
}
