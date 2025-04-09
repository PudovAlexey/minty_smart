import { ArrowThin } from "@shared/assets/icons"
import { cn } from "@shared/lib/utils/cn"

type BalanceIndicatorProps = {
	balance: number
	change: number
}

export const BalanceIndicator = ({
	balance,
	change,
}: BalanceIndicatorProps) => {
	return (
		<div className="flex items-center mb-6">
			<div className="font-bold text-[32px] leading-none">
				${balance.toFixed(2)}
			</div>
			<div
				className={cn(
					'text-lg font-medium ml-2 flex items-center',
					change > 0 ? 'text-positive' : 'text-negative',
				)}
			>
				<ArrowThin
					className={cn(
						'mr-0.5',
						change > 0
							? 'stroke-positive rotate-180'
							: 'stroke-negative -rotate-90',
					)}
				/>
				{change.toFixed(1)}%
			</div>
		</div>
	)
}
