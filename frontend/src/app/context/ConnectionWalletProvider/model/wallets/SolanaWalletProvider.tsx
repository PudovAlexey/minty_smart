import { PropsWithChildren, useMemo } from "react"
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';

import {
    WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from '@solana/web3.js';

function SolanaWalletProvider({children}: PropsWithChildren) {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = clusterApiUrl(network)

        const wallets = useMemo(
        () => [
            new UnsafeBurnerWalletAdapter(),
        ],
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
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