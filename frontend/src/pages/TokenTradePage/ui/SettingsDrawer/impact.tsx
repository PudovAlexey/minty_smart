import { useState } from 'react'
import { Label } from './label'
import { cn } from '@shared/lib/utils/cn'

export const Impact = () => {
	const [impact, setImpact] = useState('5%')

	return (
		<div>
			<Label>Price Impact</Label>

			<div className="w-full border bg-input border-foreground/5 rounded-full flex p-1 mb-5">
				{['5%', '10%', '15%', '20%', 'custom'].map((value) => (
					<button
						type="button"
						key={value}
						className={cn(
							'font-bold text-sm flex items-center justify-center h-[34px] px-3.5 rounded-full capitalize w-full',
							impact === value ? 'bg-positive/20 text-positive' : 'opacity-50',
						)}
						onClick={() => setImpact(value)}
					>
						{value}
					</button>
				))}
			</div>
		</div>
	)
}
