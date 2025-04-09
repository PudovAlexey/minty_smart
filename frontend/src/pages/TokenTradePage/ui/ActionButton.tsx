import { cn } from "@shared/lib/utils/cn"

type ActionButtonProps = {
	action: 'buy' | 'sell'
	onClick?: () => void
}

export const ActionButton = ({ action, onClick }: ActionButtonProps) => {
	return (
		<div className='grow flex items-end pb-24'>
			<button
				type="button"
				onClick={onClick}
				className={cn(
					'w-full rounded-18 h-14 capitalize font-bold text-primary',
					action === 'buy' ? 'bg-positive' : 'bg-negative',
				)}
			>
				{action}
			</button>
		</div>
	)
}
