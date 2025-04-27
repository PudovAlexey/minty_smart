import { Typography } from '@shared/ui/typography';
import cls from './MerchantCell.module.scss'
import { Dayjs } from 'dayjs';
import { OnlineStatus } from '@shared/ui/OnlineStatus/OnlineStatus';
import { Avatar } from '@shared/ui/Avatar/Avatar';


type MerchantCellProps = {
    title: string,
    orderCount: number,
    lastTimeUpdate: Dayjs,
    merchantAvatar?: string,
    isOnline: boolean,
    successfullDealsPercent: number,

}

function MerchantCell({
    title,
    orderCount,
    lastTimeUpdate,
    merchantAvatar,
    successfullDealsPercent,
    isOnline,
}: MerchantCellProps) {
    return (
        <div className={cls.cellWrap}>
            {/* <img src={merchantAvatar}/> */}
            <Avatar size='xs' src={merchantAvatar} />
            <div className={cls.merchantTeext}>
                <Typography.IbmPlexMono name="Para-M">{title}</Typography.IbmPlexMono>
                <div className={cls.orders}>
                    <Typography.Ubuntu name="Label-U-L">{`${orderCount} order(s)`}</Typography.Ubuntu>
                    {"|"}
                    <Typography.Ubuntu name="Label-U-L">{`${successfullDealsPercent}%`}</Typography.Ubuntu>
                </div>
                <Typography.Ubuntu name="Label-U-L">{lastTimeUpdate.format('DD.MM.YYYY HH:mm')}</Typography.Ubuntu>
                <OnlineStatus isOnline={isOnline} />
                {/* <div>{lastTimeUpdate}</div> */}
            </div>
        </div>
    )
}

export {
    MerchantCell
}