import millify from 'millify'
import WhaleBig from '@shared/assets/filterIcons/whale-big.webp';
import Whale from '@shared/assets/filterIcons/whale.webp';
import Shrimp from '@shared/assets/filterIcons/shrimp.webp';
import Fish from '@shared/assets/filterIcons/fish.webp';

export type ItemSizeProps = {
	size: number
}

const getImage = (size: number) => {
	if (size >= 1000) return WhaleBig

	if (size >= 500) return Whale

	if (size >= 100) return Shrimp

	return Fish
}

export const ItemSize = ({ size }: ItemSizeProps) => {
	return (
		<div className="flex items-center gap-1 w-16">
			{size > 1 ? `$${millify(size)}` : '<$1'}

			<img
				src={getImage(size)}
				width={14}
				height={14}
				alt="size"
			/>
		</div>
	)
}
