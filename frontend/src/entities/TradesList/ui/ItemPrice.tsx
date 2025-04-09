// import { cn, formatNumber } from '@/lib/utils'
// import type { ItemTypeProps } from './item-type'

import { cn } from "@shared/lib/utils/cn"
import { ItemTypeProps } from "./ItemType"
import { formatNumber } from "@shared/lib/formatters/formatNumber"

export type ItemPriceProps = {
	price: number
} & ItemTypeProps

export const ItemPrice = ({ price, type }: ItemPriceProps) => {
	return <div className={cn('w-[100px]',type === 'buy' ? 'text-positive' : 'text-negative')}>${formatNumber(price)}</div>
}
