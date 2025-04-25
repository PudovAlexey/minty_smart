import {Dayjs} from 'dayjs';

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
        <div>
            <img src={merchantAvatar}/>

            <div>
                <div>{title}</div>
                <div>{orderCount}</div>
                <div>{successfullDealsPercent}</div>
                <div>{lastTimeUpdate.format('DD.MM.YYYY HH:mm')}</div>
                <div>{isOnline}</div>
                {/* <div>{lastTimeUpdate}</div> */}
            </div>
        </div>
    )
}

export {
    MerchantCell
}