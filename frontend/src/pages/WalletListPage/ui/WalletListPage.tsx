import { WalletButton } from '@entities/WalletButton/ui/WalletButton'
import { handleCopy } from '@shared/lib/utils/handleCopy'
// import { useTonAddress } from '@tonconnect/ui-react'
import { useCallback } from 'react'
import { useParams, useSearchParams } from 'react-router'

function WalletListPage() {
    // const address = useTonAddress()
    const { chain } = useParams();
    // const chain = '';
	const onCopy = useCallback((address: string) => {
		handleCopy(address)
	}, [])

	return (
		<div className="h-full flex flex-col w-full px-4 font-medium text-lg pt-6">
			<h2 className="mb-6">Select a wallet</h2>

			<div className="flex flex-col h-auto gap-4 pb-40">
				{/* <WalletButton chain={chain as string} address={address} onCopy={onCopy} />
				<WalletButton chain={chain as string} address={address} onCopy={onCopy} />
				<WalletButton chain={chain as string} address={address} onCopy={onCopy} />
				<WalletButton chain={chain as string} address={address} onCopy={onCopy} /> */}
			</div>
		</div>
	)
}

export {
    WalletListPage
}
