import { useState } from 'react'
import { Label } from './label'
import { cn } from '@shared/lib/utils/cn'

export const Slippage = () => {
	const [slippage, setSlippage] = useState('auto')

	return (
		<div>
			<Label>Slippage</Label>

			<div className="w-full border bg-input border-foreground/5 rounded-full flex p-1 mb-5">
				{['auto', '5%', '15%', '50%', 'custom'].map((value) => (
					<button
						type="button"
						key={value}
						className={cn(
							'font-bold text-sm flex items-center justify-center h-[34px] px-3.5 rounded-full capitalize w-full',
							slippage === value
								? 'bg-positive/20 text-positive'
								: 'opacity-50',
						)}
						onClick={() => setSlippage(value)}
					>
						{value}
					</button>
				))}
			</div>
		</div>
	)
}
