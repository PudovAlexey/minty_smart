import { SOL, TON } from "@shared/assets/icons"
import { cn } from "@shared/lib/utils/cn"

type ChainArticleProps = {
	token: 'sol' | 'ton'
	title: string
	description: string
	icon: React.ReactNode
	onClick?: () => void
	className?: string
	iconSize?: number
}

export const ChainArticle = ({
	token,
	title,
	description,
	icon,
	onClick,
	className,
	iconSize = 28,
}: ChainArticleProps) => {
	const ChainIcon = token === 'ton' ? TON : SOL

	const bg =
		token === 'ton'
			? 'border-[#0098EA]/50 bg-[#0098EA]/20'
			: 'border-[#8752F3]/50 bg-[#8752F3]/20'

	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				'w-full h-16 rounded-22 border px-[18px] py-3.5 flex items-center justify-between',
				bg,
				className,
			)}
		>
			<div className="flex items-center gap-3">
				<ChainIcon width={iconSize} height={iconSize} />

				<div className="flex flex-col items-start font-bold leading-tight capitalize">
					{title}
					<span className="capitalize opacity-50 text-xs">{description}</span>
				</div>
			</div>

			{icon}
		</button>
	)
}
