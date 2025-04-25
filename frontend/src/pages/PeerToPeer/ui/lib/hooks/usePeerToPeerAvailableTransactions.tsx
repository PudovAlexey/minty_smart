import { useState } from "react";

type PToPItem = {
    merchant: string,
    merchantAvatar: string,
    orders: number,
    isOnline: boolean,
    price: number,
    available: number,
    orderLimit: number,
    token: string,
}

const PToPList: PToPItem[] = [
    {
        merchant: "Merchant 1",
        orders: 0,
        isOnline: true,
        merchantAvatar: ""
    },
    {
        merchant: "Merchant 2",
        orders: 0,
        isOnline: true,
        merchantAvatar: ""
    },
    {
        merchant: "Merchant 3",
        orders: 0,
        isOnline: true,
        merchantAvatar: ""
    },
];

function usePeerToPeerAvailableTransactions() {
    const [peersToPeers, setPeersToPeers] = useState<PToPItem[]>([]);
    return {
        peersToPeers
    }
}

export {
    usePeerToPeerAvailableTransactions
}