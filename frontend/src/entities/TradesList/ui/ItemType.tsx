import { Dollar } from "@shared/assets/icons"
import { cn } from "@shared/lib/utils/cn"

export type ItemTypeProps = {
	type: 'buy' | 'sell'
}

export const ItemType = ({ type }: ItemTypeProps) => {
	return (
		<Dollar
			className={cn('w-[22px]',type === 'buy' ? 'fill-positive' : 'fill-negative')}
		/>
	)
}
