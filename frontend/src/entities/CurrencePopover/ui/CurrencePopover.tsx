import { PopoverClose } from "@radix-ui/react-popover"
import { Chevron } from "@shared/assets/icons"
import { Popover, PopoverContent, PopoverTrigger } from "@shared/ui/Popover/Popover"
import { useState } from "react"

export const CurrencyPopover = () => {
	const [currency, setCurrency] = useState('USD')

	return (
		<div className="flex items-center gap-2 mb-3">
			<h3 className="font-medium opacity-50 text-sm">Total balance</h3>
			<Popover>
				<PopoverTrigger className="h-[18px] rounded-full px-1.5 bg-positive/20 flex gap-0.5 items-center justify-center leading-none font-bold text-xs text-positive">
					{currency}
					<Chevron />
				</PopoverTrigger>
				<PopoverContent
					align="start"
					className="flex flex-col items-start gap-3.5 leading-none w-28"
				>
					{['USD', 'EUR', 'SOL', 'TON'].map((item, index) => (
						<PopoverClose key={index} onClick={() => setCurrency(item)}>
							{item}
						</PopoverClose>
					))}
				</PopoverContent>
			</Popover>
		</div>
	)
}
