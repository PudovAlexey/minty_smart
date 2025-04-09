// import { ItemDate, type ItemDateProps } from './item-date'
// import { ItemPrice, type ItemPriceProps } from './item-price'
// import { ItemSize, type ItemSizeProps } from './item-size'
// import { ItemType, type ItemTypeProps } from './item-type'
// import { ItemWallet, type ItemWalletProps } from './item-wallet'

import { ItemDate, ItemDateProps } from "./ItemDate"
import { ItemPrice, ItemPriceProps } from "./ItemPrice"
import { ItemSize, ItemSizeProps } from "./ItemSize"
import { ItemType, ItemTypeProps } from "./ItemType"
import { ItemWallet, ItemWalletProps } from "./ItemWallet"

export type TradeItemProps = ItemDateProps &
	ItemTypeProps &
	ItemSizeProps &
	ItemPriceProps &
	ItemWalletProps

export const TradeItem = ({
	date,
	type,
	size,
	price,
	wallet,
}: TradeItemProps) => {
	return (
		<div className="h-[22px] w-full flex items-center justify-between">
			<ItemDate date={date} />
			<ItemType type={type} />
			<ItemSize size={size} />
			<ItemPrice price={price} type={type} />
			<ItemWallet wallet={wallet} />
		</div>
	)
}
