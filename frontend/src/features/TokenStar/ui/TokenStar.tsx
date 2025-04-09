// import { usePathname } from 'next/navigation'
import { Star } from '@shared/assets/icons'
import { cn } from '@shared/lib/utils/cn'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

export type TokenStarProps = {
	slug: string
}

export const TokenStar = ({ slug }: TokenStarProps) => {
	const [isStarred, setIsStarred] = useState(false)

	return (
		<div className="flex gap-3">
			<button
				type="button"
				onClick={() => setIsStarred((p) => !p)}
				className="bg-foreground/10 text-primary w-[34px] h-[34px] rounded-full flex items-center justify-center"
			>
				<Star
					className={cn(
						isStarred
							? 'stroke-transparent fill-primary-foreground'
							: 'stroke-foreground/50',
					)}
				/>
			</button>

			<Link
				to={`/token/trade/${slug}`}
				className="bg-primary-foreground text-primary flex items-center justify-center px-5 h-[34px] rounded-full font-bold"
			>
				Trade
			</Link>
		</div>
	)
}
