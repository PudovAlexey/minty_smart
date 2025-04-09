// import { cn } from '@/lib/utils'
// import Image from 'next/image'
import { cn } from '@shared/lib/utils/cn'
import { useState } from 'react'
import FishIcon from '@shared/assets/filterIcons/fish.webp';
import ShrimpIcon from '@shared/assets/filterIcons/shrimp.webp';
import WhaleIcon from '@shared/assets/filterIcons/whale.webp';
import WhaleBigIcon from '@shared/assets/filterIcons/whale-big.webp';

const iconConfig = {
    fish: FishIcon,
    shrimp: ShrimpIcon,
    whale: WhaleIcon,
    "whale-big": WhaleBigIcon
};

export const TradesFilter = () => {
	const [activeFilter, setActiveFilter] = useState('all')

	return (
		<div className="flex justify-start gap-3 mb-[18px]">
			{['all', 'fish', 'shrimp', 'whale', 'whale-big'].map((filter, i) => (
				<button
					type="button"
					onClick={() => setActiveFilter(filter)}
					key={filter}
					className={cn(
						'w-[42px] h-[30px] flex items-center bg-[#25282D] text-foreground/50 font-medium justify-center rounded-9 capitalize border border-transparent',
						activeFilter === filter && 'border-accent-foreground',
						i === 0 && 'w-14',
					)}
				>
					{i === 0 ? (
						'All'
					) : (
						<img
							src={(iconConfig as any)[filter]}
							alt={filter}
							width={22}
							height={22}
						/>
					)}
				</button>
			))}
		</div>
	)
}
