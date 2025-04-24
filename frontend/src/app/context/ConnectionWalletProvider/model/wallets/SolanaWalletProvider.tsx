import { PropsWithChildren, useMemo } from "react"
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';

import {
    WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from '@solana/web3.js';

const SOLANA_CLASTER_URL = 'http://127.0.0.1:8899';

function SolanaWalletProvider({children}: PropsWithChildren) {
    // const network = WalletAdapterNetwork.Devnet;
    // const endpoint = clusterApiUrl(SOLANA_CLASTER_URL)

        const wallets = useMemo(
        () => [
            new UnsafeBurnerWalletAdapter(),
        ],
        [SOLANA_CLASTER_URL]
    );

    return (
        <ConnectionProvider endpoint={SOLANA_CLASTER_URL}>
            <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
                {children}
            </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}

export {
    SolanaWalletProvider
}