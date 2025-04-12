import { useInstructionsContext } from "@app/context/InstructionsContext/InstructionsContext"
import { SOL, TON } from "@shared/assets/icons"
import { PublicKey } from "@solana/web3.js"
import { useEffect, useState } from "react"

export type TokenImageProps = {
	mintAccount: PublicKey
	size: number
}

function TokenImage({ 
	mintAccount,
	size,
 }: TokenImageProps) {
	const Chain = SOL

	const {suppliedTokenInstructions} = useInstructionsContext();

	const [tokenImage, setTokenImage] = useState('');

	const handleGetTokenImage = async () => {
		const url = await suppliedTokenInstructions?.getMintMetadata(mintAccount);

		setTokenImage(url || '')
	}

	useEffect(() => {
		handleGetTokenImage()
	}, [])

	return (
		<div className="relative">
			<img
				src={tokenImage}
				width={size}
				height={size}
				// quality={100}
				alt="coin"
				className="rounded-full aspect-square"
				// style={{ width: size, height: size, minWidth: size, minHeight: size }}
			/>
			{
				<Chain
					className="absolute -right-px -bottom-px border-2 border-background rounded-full aspect-square"
					// width={size / 2.5}
					// height={size / 2.5}
				/>
			}
		</div>
	)
}


export {
    TokenImage
}