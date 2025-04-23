import { Link } from "react-router"
import { TokenImage } from "./TokenImage"
import { TokenBio } from "./TokenBio"
import { TokenChart } from "./TokenChart"
import { TokenPrice } from "./TokenPrice"
import { PublicKey } from "@solana/web3.js"
import { GetSupplietListResponse } from "@shared/api/api_schema/requests"

function TokenItem({
	name,
	history,
	current_price,
	image_url,
	price_spread
	// name,
	// symbol,
	// marketAccount,
	// tokenMint,
}: GetSupplietListResponse) {
	return (
		<Link
			to={`/token/${name}`}
			className="h-9 w-full flex items-center justify-between"
		>
			<div className="flex items-center justify-center gap-3">
				<TokenImage imageUrl={image_url} size={32} />

				<TokenBio symbol={name} name={name} />
			</div>

			<TokenChart change={price_spread} chart={history} />

			<TokenPrice price={current_price} change={price_spread}  />
		</Link>
	)
}

export {
    TokenItem
}
