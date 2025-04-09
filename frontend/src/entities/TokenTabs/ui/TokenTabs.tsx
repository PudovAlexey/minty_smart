'use client'

import { cn } from "@shared/lib/utils/cn"

// import { cn } from '@/lib/utils'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'

type TabItem = {
    label: string,
    key: string
}

export type TokenTabsProps = {
	items: TabItem[]
    activeTab: string
    onTokenTabChange: (key: string) => void
}

export const TokenTabs = ({ items, activeTab, onTokenTabChange }: TokenTabsProps) => {

	return (
		<div className="flex justify-start w-full px-4 gap-4 font-medium text-lg mb-5">
			{items.map(({label, key}) => (
				<div
					key={key}
                    onClick={() => onTokenTabChange(key)}
					className={cn(
						'opacity-50 capitalize',
						activeTab === key &&
							'text-accent-foreground opacity-100',
					)}
				>
					{label}
				</div>
			))}
		</div>
	)
}
