// import { Copy2 } from '@/components/icons'
// import { Button } from '@/components/ui'
// import { handleCopy, trimWallet } from '@/lib/utils'
// import { QRCodeCanvas } from 'qrcode.react'

import { Copy2 } from "@shared/assets/icons";
import { trimWallet } from "@shared/lib/formatters/trimWallet";
import { handleCopy } from "@shared/lib/utils/handleCopy";
import { Button } from "@shared/ui/Button/Button";
import { useTonAddress } from "@tonconnect/ui-react";
import { QRCodeCanvas } from "qrcode.react";
import { useParams } from "react-router";

function WalletAddressPage() {
    const { chain } = useParams();
    const tokenChain = chain as string
    const address = useTonAddress();
    
	return (
		<div className="mt-20 flex flex-col items-center h-full px-4">
			<div className="rounded-32 overflow-hidden p-5 bg-white">
				<QRCodeCanvas
					value={address}
					size={176}
					title="address"
					imageSettings={{
						src: `/token/${tokenChain}.svg`,
						width: 34,
						height: 34,
						excavate: true,
					}}
				/>
			</div>

			<h2 className="font-bold text-2xl mt-5 mb-1">
				Your address in {tokenChain.toUpperCase()}
			</h2>
			<p className="text-center opacity-50 px-8 font-medium">
				Use this address to receive tokens and NFT only on the{' '}
				{tokenChain.toUpperCase()} network
			</p>

			<Button
				variant="secondary"
				size="lg"
				className="w-full mt-auto mb-24 justify-between px-[18px]"
				onClick={() => handleCopy(address)}
			>
				{trimWallet(address)}

				<Copy2 />
			</Button>
		</div>
	)
}

export {
    WalletAddressPage
}
