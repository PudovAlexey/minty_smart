import { TokenImage, TokenImageProps } from "@entities/TokenList/ui/TokenImage"
import { TokenStar, TokenStarProps } from "@features/TokenStar/ui/TokenStar"
import { TokenBio, TokenBioProps } from "./TokenBio"

export type TokenHeaderProps = TokenImageProps & TokenBioProps & TokenStarProps & {
	showTokenStar?: boolean
}

export const TokenHeader = ({
	image,
	token,
	symbol,
	price,
	change,
	slug,
	showTokenStar,
}: TokenHeaderProps) => {
	return (
		<>
			<div className="flex items-center justify-between w-full pt-3.5 mb-6 px-4">
				<div className="flex items-center gap-3">
					<TokenImage image={image} token={token} size={44} />
					<TokenBio
						symbol={symbol}
						price={price}
						change={change}
						token={token}
					/>
				</div>

				{showTokenStar && <TokenStar slug={slug} />}
				
			</div>
		</>
	)
}