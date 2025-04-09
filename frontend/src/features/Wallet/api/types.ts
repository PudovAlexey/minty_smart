
type ChainType = 'sol' | 'ton';

type WalletInfo = {
    address: string
    balance: number
    chain: ChainType
};

export type {
    ChainType,
    WalletInfo
}