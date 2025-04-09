import { useMemo, useState } from "react"
import { TabItem } from "./TabItem"

type Item = {
	key: string
	label: string
}

type TabsProps = {
	title?: string
	items: Item[]
	activeKey?: Item['key']
	onActiveKeyChange?: (key: string) => void;
}

function Tabs({ title, activeKey: initialActiveKey, onActiveKeyChange, items }: TabsProps) {
	const [activeKey, setActiveKey] = useState<Item['key']>(items[0].key)

	const definedActiveKey = useMemo(() => initialActiveKey ? initialActiveKey : activeKey, [initialActiveKey, activeKey]);

	const definedActiveKeyChange = useMemo(() => onActiveKeyChange ? onActiveKeyChange : setActiveKey, [onActiveKeyChange, setActiveKey]);

	return (
		<div className="w-full flex justify-between pb-3.5 px-4">
			{title && <h2 className="font-bold text-lg">{title}</h2>}

			<div className="flex gap-3.5 font-medium">
				{items.map(({ key, label }) => (
					<TabItem
						active={definedActiveKey === key}
						key={key}
						onClick={() => definedActiveKeyChange(key)}
					>
						{label}
					</TabItem>
				))}
			</div>
		</div>
	)
}

export {
	Tabs
}