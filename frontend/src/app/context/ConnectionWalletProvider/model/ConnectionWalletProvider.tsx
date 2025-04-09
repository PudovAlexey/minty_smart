import { TokenType } from "@features/Wallet/api/types";
import { PropsWithChildren, useMemo, useState, createContext } from "react"
import { SolanaWalletProvider } from "./wallets/SolanaWalletProvider";
import { TonWalletProvider } from "./wallets/TonWalletProvider";

type WalletConnectionProvider = {};

const ConnectionWalletContext = createContext<Partial<WalletConnectionProvider>>({});

function ConnectionWalletProvider({ children }: PropsWithChildren) {
    return (
        <ConnectionWalletContext.Provider value={{}}>
            <SolanaWalletProvider>
                {/* <TonWalletProvider> */}
                    {children}
                {/* </TonWalletProvider> */}
            </SolanaWalletProvider>
        </ConnectionWalletContext.Provider>
    )
}

export {
    ConnectionWalletProvider
}