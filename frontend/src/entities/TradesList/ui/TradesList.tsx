// import { TradeItem, type TradeItemProps } from './trade-item'

import { TradeItem, TradeItemProps } from "./TradeItem"

type TradesListProps = {
	trades: TradeItemProps[]
}

export const TradesList = ({ trades }: TradesListProps) => {
	return (
		<div className="flex flex-col gap-4 w-full h-auto overflow-y-scroll scrollbar-hide relative font-semibold text-sm">
			{trades.map((trade, index) => (
				<TradeItem key={index} {...trade} />
			))}
		</div>
	)
}
