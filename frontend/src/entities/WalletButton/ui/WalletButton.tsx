import { Copy2, QR, SOL, TON } from "@shared/assets/icons"
import { Link } from "react-router"

type WalletButtonProps = {
	chain: string
	address: string
	onCopy: (address: string) => void
}

export const WalletButton = ({ chain, address, onCopy }: WalletButtonProps) => {
	const Icon = chain === 'ton' ? TON : SOL

	return (
		<button
			type="button"
			className="h-[76px] w-full flex items-center justify-between rounded-22 bg-input border border-foreground/5 p-[18px]"
		>
			<div className="flex items-center gap-3.5">
				<Icon width={40} height={40} />
				<h6 className="font-bold">
					{`${address.slice(0, 4)}...${address.slice(-4)}`}
				</h6>
			</div>

			<div className="flex items-center gap-4">
				<Link to={`/wallet/address/${chain}`}>
					<QR />
				</Link>
				<Copy2 onClick={() => onCopy(address)} />
			</div>
		</button>
	)
}
