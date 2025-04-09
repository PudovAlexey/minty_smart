import millify from 'millify'
import { cn } from "@shared/lib/utils/cn"
import { ArrowBadge } from '@shared/ui/ArrowBadge/ArrowBadge'
import { TokenChart } from '@entities/TokenList/ui/TokenChart'
// import { ArrowBadge } from '@/components/ui'
// import { cn } from '@/lib/utils'
// import { TokenChart } from './token-chart'


type CardSmProps = {
	className?: string
	title: string
	value: number
	usd?: boolean
	change?: number
	chart?: number[]
}

export const CardSm = ({
	className,
	title,
	value,
	usd,
	change,
	chart,
}: CardSmProps) => {
	return (
		<div
			className={cn(
				'bg-foreground/5 text-card-foreground rounded-16 font-bold w-full p-3 flex flex-col items-start justify-start',
				className,
			)}
		>
			<h3 className="uppercase opacity-50 leading-none text-[10px] mb-2">
				{title}
			</h3>
			<h3 className="uppercase leading-none [&_span]:opacity-50">
				{millify(value)} {usd && <span>USD</span>}
			</h3>

			<div className="flex items-center justify-between w-full pr-2 ">
				{change && <ArrowBadge change={change} />}
				{chart && change && <TokenChart chart={chart} change={change} />}
			</div>
		</div>
	)
}
