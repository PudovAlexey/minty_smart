import { SOL, TON, WalletArchieve, WalletImport } from '@shared/assets/icons'
import { Button } from '@shared/ui/Button/Button'
import { Link, useNavigate } from 'react-router'
// import { useTonConnectUI } from '@tonconnect/ui-react';
import { toast } from 'sonner'

import {
    useWalletModal,
    WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import {useConnection, useWallet} from '@solana/wallet-adapter-react';

type WalletInitProps = {
	token: 'sol' | 'ton'
}

export const WalletInit = ({ token }: WalletInitProps) => {
	const navigate = useNavigate();
	const { connection } = useConnection();
	// const [tonConnectUI] = useTonConnectUI();
	const walletModal = useWalletModal();

	const Chain = token === 'ton' ? TON : SOL

	const bg =
		token === 'ton'
			? '248.58deg, #0098EA 0%, #FFFFFF 100%'
			: '44.76deg, #9945FF 10.43%, #8752F3 30.84%, #5497D5 49.4%, #43B4CA 58.68%, #28E0B9 69.81%, #19FB9B 93.01%'

	const handleCreateWallet = () => {
		walletModal.setVisible(true);
	}

	return (
		<article
			className="rounded-26 w-full flex flex-col gap-7 p-3.5"
			style={{ background: `linear-gradient(${bg})` }}
		>
			<div className="w-full flex items-center justify-between">
				<Chain width={42} height={42} />

				<span className="font-bold text-accent">
					{String(token).toUpperCase()} Wallet
				</span>
			</div>

			<div className="flex w-full justify-between gap-1.5">
				<Link
					// to={`/wallet/wallet/import/${token}${token === 'sol' ? '/seed' : ''}`}
					to={`/wallet/import?token=${token}${token === 'sol' ? '&seed=true' : ''}`}
					className="w-full"
				>
					<Button className="px-0 w-full gap-1.5">
						<WalletImport className="fill-accent" />
						Import
					</Button>
				</Link>
				<Button className="px-0 w-full gap-1.5" onClick={handleCreateWallet}>
					<WalletArchieve className="stroke-accent" />
					Create
				</Button>
				{/* <TonConnectButton /> */}
			</div>
		</article>
	)
}
