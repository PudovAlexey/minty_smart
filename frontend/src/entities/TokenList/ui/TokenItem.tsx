import { Link } from "react-router"
import { TokenProps } from "../api/types"
import { TokenImage } from "./TokenImage"
import { TokenBio } from "./TokenBio"
import { TokenChart } from "./TokenChart"
import { TokenPrice } from "./TokenPrice"

function TokenItem({
	image,
	token,
	symbol,
	name,
	chart,
	price,
	change,
  bgFrom
}: TokenProps) {
	return (
		<Link
			to={`/token/${symbol}`}
			className="h-9 w-full flex items-center justify-between"
		>
			<div className="flex items-center justify-center gap-3">
				<TokenImage image={image} token={token} size={32} />

				<TokenBio symbol={symbol} name={name} />
			</div>

			<TokenChart change={change} chart={chart} bgFrom={bgFrom} />

			<TokenPrice price={price} change={change} />
		</Link>
	)
}

export {
    TokenItem
}
