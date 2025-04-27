import dayjs, { Dayjs } from "dayjs";

import { useState } from "react";

type PToPItem = {
    id: string,
    merchant: string,
    merchantAvatar: string,
    orders: number,
    isOnline: boolean,
    price: number,
    available: number,
    orderLimit: [number, number],
    lastTimeUpdate: Dayjs,
    successfullDealsPercent: number,
    token: string,
}

const PToPList: PToPItem[] = [
    {
        id: "1",
        merchant: "Merchant 1",
        merchantAvatar: "",
        lastTimeUpdate: dayjs(Date.now()),
        orders: 0,
        successfullDealsPercent: 0,
        isOnline: true,
        price: 0.5,
        available: 100,
        orderLimit: [10, 500],
        token: "ETH"
    },
    {
        id: "2",
        merchant: "Merchant 2",
        merchantAvatar: "",
        orders: 0,
        successfullDealsPercent: 0,
        lastTimeUpdate: dayjs(Date.now()),
        isOnline: true,
        price: 0.5,
        available: 100,
        orderLimit: [10, 500],
        token: "ETH"
    }
];

function usePeerToPeerAvailableTransactions() {
    const [peersToPeers, setPeersToPeers] = useState<PToPItem[]>(PToPList);
    return {
        peersToPeers
    }
}

export {
    usePeerToPeerAvailableTransactions
}