import { SOL, TON } from '@shared/assets/icons'
import type { SVGProps } from 'react'
import { Button } from '../Button/Button'
import { cn } from '@shared/lib/utils/cn'

export type Filter = 'all' | 'sol' | 'ton'

type ChainFiltersProps = {
	activeFilter: Filter
	setFilter: (filter: Filter) => void
}

const chains: {
	Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
	chain: Filter
}[] = [
	{ Icon: TON, chain: 'ton' },
	{ Icon: SOL, chain: 'sol' },
]

export const ChainFilters = ({
	activeFilter,
	setFilter,
}: ChainFiltersProps) => {
	return (
		<div className="flex w-full h-[42px] mb-2.5 gap-3">
			<Button
				variant="badge"
				size="badge"
				className={cn(
					'px-1',
					activeFilter === 'all' && 'border border-positive',
				)}
				onClick={() => setFilter('all')}
			>
				<TON className="relative left-1.5" />
				<SOL className="relative right-1.5" />
			</Button>
			{chains.map(({ Icon, chain }, index) => (
				<Button
					key={index}
					variant="badge"
					size="badge"
					className={cn(activeFilter === chain && 'border border-positive')}
					onClick={() => setFilter(chain)}
				>
					<Icon />
				</Button>
			))}
		</div>
	)
}
