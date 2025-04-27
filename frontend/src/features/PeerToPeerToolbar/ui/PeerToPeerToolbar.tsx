import { SearchInput } from '@shared/ui/SearchInput/SearchInput';
import cls from './PeerToPeerToolbar.module.scss';
import { Tabs } from "@shared/ui/Tabs/Tabs"
import { useState } from "react";

const buySellTabsItems = [
    {
        key: 'buy',
        label: 'Buy',
    },
    {
        key: 'sell',
        label: 'Sell',
    },
];

function PeerToPeerToolbar() {
    const [searchValue, setSearchValue] = useState('');
    const [activeBuySellKey, setActiveBuySellKey] = useState('buy')
    return (
        <div className={cls.peerToPeer}>
            <Tabs activeKey={activeBuySellKey} items={buySellTabsItems} />
            <SearchInput value={searchValue} onChange={() => setSearchValue('')} />
        </div>
    ) 
}

export {
    PeerToPeerToolbar
}