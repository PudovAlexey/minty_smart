import { SOL, TON } from "@shared/assets/icons"

export type TokenImageProps = {
	image: string
	token: 'ton' | 'sol'
	size?: number
}

function TokenImage({ image, token, size = 44 }: TokenImageProps) {
	const Chain = token === 'ton' ? TON : SOL

	return (
		<div className="relative">
			<img
				src={image}
				width={size}
				height={size}
				// quality={100}
				alt="coin"
				className="rounded-full aspect-square"
				style={{ width: size, height: size, minWidth: size, minHeight: size }}
			/>
			{
				<Chain
					className="absolute -right-px -bottom-px border-2 border-background rounded-full aspect-square"
					width={size / 2.5}
					height={size / 2.5}
				/>
			}
		</div>
	)
}


export {
    TokenImage
}