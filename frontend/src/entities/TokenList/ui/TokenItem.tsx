import { Link } from "react-router"
import { TokenImage } from "./TokenImage"
import { TokenBio } from "./TokenBio"
import { TokenChart } from "./TokenChart"
import { TokenPrice } from "./TokenPrice"
import { PublicKey } from "@solana/web3.js"

export type TokenItemProps = {
	name: string,
	symbol: string,
	marketAccount: PublicKey
	tokenMint: PublicKey
}

function TokenItem({
	name,
	symbol,
	marketAccount,
	tokenMint,
}: TokenItemProps) {
	return (
		<Link
			to={`/token/${symbol}`}
			className="h-9 w-full flex items-center justify-between"
		>
			<div className="flex items-center justify-center gap-3">
				<TokenImage mintAccount={tokenMint} size={32} />

				<TokenBio symbol={symbol} name={name} />
			</div>

			{/* <TokenChart change={change} chart={chart} bgFrom={bgFrom} /> */}

			<TokenPrice marketAccount={marketAccount}  />
		</Link>
	)
}

export {
    TokenItem
}
