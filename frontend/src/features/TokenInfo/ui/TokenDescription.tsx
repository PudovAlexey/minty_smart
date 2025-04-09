'use client'

import { CardLg } from '@entities/Statistics/ui/CardLg'
import { Chevron } from '@shared/assets/icons'
import { cn } from '@shared/lib/utils/cn'
// import { Chevron } from '@/components/icons'
// import { cn } from '@/lib/utils'
import { useState } from 'react'
// import { CardLg } from './card-lg'

export type DescriptionProps = {
	description: string
}

const MAX_LENGTH = 100

export const Description = ({ description }: DescriptionProps) => {
	const [isExpanded, setIsExpanded] = useState(false)

	return (
		<CardLg title="Description" className="mb-3">
			<p className="font-normal">
				{isExpanded ? description : description.slice(0, MAX_LENGTH)}
				{description.length > MAX_LENGTH && !isExpanded && '...'}
			</p>

			{description.length > MAX_LENGTH && (
				<button
					type="button"
					onClick={() => setIsExpanded((p) => !p)}
					className="text-sm text-accent-foreground flex items-start gap-0.5 leading-none"
				>
					More
					<Chevron className={cn(isExpanded && 'rotate-180')} />
				</button>
			)}
		</CardLg>
	)
}
