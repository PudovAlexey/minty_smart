import { useState } from 'react'
import { Label } from './label'
import { cn } from '@shared/lib/utils/cn'

export const Priority = () => {
	const [priority, setPriority] = useState('fast')

	return (
		<div>
			<Label>Priority Level</Label>

			<div className="w-2/3 border bg-input border-foreground/5 rounded-full flex p-1 mb-5">
				{['fast', 'turbo', 'ultra'].map((value) => (
					<button
						type="button"
						key={value}
						className={cn(
							'font-bold text-sm flex items-center justify-center h-[34px] px-3.5 rounded-full capitalize w-full',
							priority === value
								? 'bg-positive/20 text-positive'
								: 'opacity-50',
						)}
						onClick={() => setPriority(value)}
					>
						{value}
					</button>
				))}
			</div>
		</div>
	)
}
