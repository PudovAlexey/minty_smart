
import cls from './PeerToPeerPage.module.scss';
import { Table } from '@shared/ui/Table/Table';
import { usePeerToPeerAvailableTransactions } from './lib/hooks/usePeerToPeerAvailableTransactions';
import { useMemo } from 'react';
import { MerchantCell } from '@entities/MerchantCell/ui/MerchantCell';
import { Button } from '@shared/ui/Button/Button';
import { OrderLimitCell } from '@entities/OrderLimitCell/OrderLimitCell';
import { PeerToPeerToolbar } from '@features/PeerToPeerToolbar/ui/PeerToPeerToolbar';
import { ButtonV2 } from '@shared/ui/ButtonV2/ButtonV2';
import { Typography } from '@shared/ui/typography';

const columns = [
    {
        title: 'Merchant',
        dataIndex: 'merchant',
        key: 'merchant',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Order',
        dataIndex: 'available',
        key: 'available',
    },
    {
        title: 'Deal',
        dataIndex: 'deal',
        key: 'deal',
    },
];



function PeerToPeerPage() {
    const { peersToPeers } = usePeerToPeerAvailableTransactions();

    const dataSource = useMemo(() => {
        return peersToPeers.map(({
            merchant,
            merchantAvatar,
            lastTimeUpdate,
            orders,
            isOnline,
            price,
            available,
            orderLimit,
            token,

        }) => ({
            merchant: <MerchantCell
                title={merchant}
                orderCount={orders}
                isOnline={isOnline}
                merchantAvatar={merchantAvatar}
                lastTimeUpdate={lastTimeUpdate}
                successfullDealsPercent={0}
            />,
            price: `${price} USD`,
            available: <OrderLimitCell orderLimit={orderLimit} available={available} token={token} />,
            dataIndex: 0,
            deal: <ButtonV2>Buy</ButtonV2>,
        }))
    }, [peersToPeers]);

    return (
        <div className={cls.peerToPeerCard}>
            <Typography.Ubuntu name="H1-U">Buy and Sell with zero commission</Typography.Ubuntu>
            <PeerToPeerToolbar/>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    )
}

export default PeerToPeerPage;