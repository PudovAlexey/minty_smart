import { Table } from '@shared/ui/Table/Table';
import { usePeerToPeerAvailableTransactions } from './lib/hooks/usePeerToPeerAvailableTransactions';
import { useMemo } from 'react';
import { MerchantCell } from '@entities/MerchantCell/ui/MerchantCell';

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
        title: 'Available | Order Limit',
        dataIndex: 'available',
        key: 'available',
    },
    {
        title: 'Token',
        dataIndex: 'token',
        key: 'token',
    },
    {
        title: 'Deal',
        dataIndex: 'deal',
        key: 'deal',
    },
];



function PeerToPeerPage() {
    const {peersToPeers} = usePeerToPeerAvailableTransactions();

    const dataSource = useMemo(() => {
        return peersToPeers.map(({
            merchant,
            merchantAvatar,
            orders,
            isOnline,
            

        }) => ({
            merchant: <MerchantCell 
                title={merchant}
                orderCount={orders}
                isOnline={isOnline}
                merchantAvatar={merchantAvatar} 
                // lastTimeUpdate={new Dayjs} 
                successfullDealsPercent={0}
            />,
            price: 0,
            available: 0,
            token: 0,
            dataIndex: 0,
        }))
    }, [peersToPeers]);

    return (
        <div>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    )
}

export default PeerToPeerPage;