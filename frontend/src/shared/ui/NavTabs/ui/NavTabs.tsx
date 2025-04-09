import { cn } from "@shared/lib/utils/cn"
import { useMemo, useState } from "react"

type Item = {
	key: string
	label: string
}

type NavTabsProps = {
	title?: string
	items: Item[]
	activeKey?: Item['key']
	onActiveKeyChange?: (ket: string) => void;
}

 const NavTabs = ({ title, activeKey: initialActiveKey, onActiveKeyChange, items }: NavTabsProps) => {
	const [activeKey, setActiveKey] = useState<Item['key']>(items[0].key)

	const definedActiveKey = useMemo(() => initialActiveKey ? initialActiveKey : activeKey, [initialActiveKey, activeKey]);

	const definedActiveKeyChange = useMemo(() => onActiveKeyChange ? onActiveKeyChange : setActiveKey, [onActiveKeyChange, setActiveKey]);

	return (
		<div className="h-[52px] w-full flex justify-between p-1 bg-input rounded-full border shrink-0 border-foreground/5 mb-[22px]">
			{items.map(({key, label}) => (
				<div
					onClick={() => definedActiveKeyChange(key)}
					key={key}
					className={cn(
						'w-full flex items-center justify-center font-bold capitalize rounded-full opacity-50',
						definedActiveKey === key &&
							'text-positive bg-positive/20 opacity-100',
					)}
				>
					{label}
				</div>
			))}
		</div>
	)
}

export {
    NavTabs
}