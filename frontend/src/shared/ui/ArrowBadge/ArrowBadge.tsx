import { Arrow } from "@shared/assets/icons"
import { cn } from "@shared/lib/utils/cn"

type ArrowBadgeProps = {
	change: number
}

export const ArrowBadge = ({ change }: ArrowBadgeProps) => {
	return (
		<div
			className={cn(
				'h-[21px] px-1.5 leading-none mt-2.5 rounded-full text-[10px] flex items-center justify-center gap-0.5',
				change > 0
					? 'bg-positive/20 text-positive'
					: 'bg-negative/20 text-negative',
			)}
		>
			{change.toFixed(1)}%
			<Arrow
				className={cn(change > 0 ? 'stroke-positive' : 'stroke-negative rotate-180')}
			/>
		</div>
	)
}
