// import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { ChainType, WalletInfo } from "../api/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useWallet as solanaWallet } from "@solana/wallet-adapter-react";
import {useConnection, useWallet as useSolanaWallet} from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const JUPITER_API_URL = "https://lite-api.jup.ag/price/v2";
const SOLANA_MINT_ADDRESS = "So11111111111111111111111111111111111111112";
const FIAT_API_URL = "https://www.cbr-xml-daily.ru/latest.js"

type UseWalletProps = {
    balanceConvert?: 'USD' | 'EUR' | 'SOL' | 'TON'
}

function useWallet({
    balanceConvert = 'USD'
}: UseWalletProps) {

    const {connection} = useConnection()
    const {wallet, publicKey} = useSolanaWallet();

    const [balance, setBalance] = useState(0);
    const [priceChanged, setPriceChanged] = useState(14);

    const handleGetBalanceInitiate = useCallback(async () => {
        if (connection && publicKey) {
            const balance = await connection.getBalance(publicKey);
            const priceInSolana = balance / LAMPORTS_PER_SOL;
            const jupiterApi = await fetch(`${JUPITER_API_URL}?ids=${SOLANA_MINT_ADDRESS}`)
            .then(response => response.json())

            
            const priceInUSD = +jupiterApi.data[SOLANA_MINT_ADDRESS].price
            
            if (balanceConvert == 'USD') {
                
                
                setBalance(priceInUSD * priceInSolana);
            } else {
                const fiatPrices = await fetch(FIAT_API_URL)
                .then(response => response.json());

                const priceConvert = fiatPrices.rates[balanceConvert] / fiatPrices.rates['USD'];

                const newPrice = priceConvert * priceInUSD;

                setBalance(newPrice * priceInSolana);

            }
        }
    }, [connection, publicKey, balanceConvert]);

    useEffect(() => {
        handleGetBalanceInitiate()
    }, [handleGetBalanceInitiate]);

    return {
        balance,
        priceChanged
    }

}

export {
    useWallet
}