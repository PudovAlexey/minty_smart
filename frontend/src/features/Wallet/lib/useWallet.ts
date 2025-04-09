import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { ChainType, WalletInfo } from "../api/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useWallet as solanaWallet, useConnection } from "@solana/wallet-adapter-react";

function useWallet() {
    const [walletInfoLoading, setWalletInfoLoading] = useState(false);
    const [activeWallet, setActiveWallet] = useState<WalletInfo | null>(null);
    const existingWallets: WalletInfo[] = [];
    const solanaWal = solanaWallet();
    const { connection } = useConnection();
    const [tonConnectUI] = useTonConnectUI();
    const tonWall = useTonWallet();
    const chainConnection = useMemo(() => {
        if (!!tonWall) {
            return 'ton'
        } else if (!!solanaWal.connected) {
            return 'sol'
        } else {
            return null;
        }
    }, [tonWall, solanaWal.connected]);


    const handleUploadTonWallet = useCallback(async () => {
        const address  = tonWall?.account.address || '';
        const url = `
		https://toncenter.com/api/v2/getAddressBalance?address=${address}`;

        const res = await fetch(url)
        .then((res) => res.json());
        
            const walletInfo  = {
                address: address,
                balance: parseFloat(res.result) / 1e9,
                chain: 'ton' as ChainType
            }

            setActiveWallet(walletInfo)
    }, []);
    
    const handleUploadSolanaWallet = useCallback(async () => {
        const address = solanaWal.publicKey;
        const balance = await connection.getBalance(address!);
        const walletInfo = {
            address: solanaWal.publicKey?.toString() || '',
            balance: balance,
            chain: 'sol' as ChainType
        };
    
        setActiveWallet(walletInfo);
    }, []);

    const refetchWalletInfo = useCallback(async () => {

    }, [handleUploadTonWallet, handleUploadSolanaWallet]);

    useEffect(() => {
        if (chainConnection === 'ton') {
            handleUploadTonWallet()
        } else if (chainConnection === 'sol') {
            handleUploadSolanaWallet()
        }
    }, [chainConnection]);
    
    return {
        activeWallet,
        existingWallets,
        chainConnection,
        walletInfoLoading,
        refetchWalletInfo
    }
}

export {
    useWallet
}