import { Typography } from '@shared/ui/typography';
import cls from './OrderLimitCell.module.scss';

type OrderLimitCellProps = {
    available: number
    orderLimit: [number, number],
    token: string

}

function OrderLimitCell({
    available,
    token,
    orderLimit
}: OrderLimitCellProps) {
    return (
        <div className={cls.orderLimits}>
            <Typography.Ubuntu name="Label-U-L">{`${available} ${token}`}</Typography.Ubuntu>
            <Typography.Ubuntu name="Label-U-L">{`${orderLimit[0]} - ${orderLimit[1]}`}</Typography.Ubuntu>
        </div>
    )
}

export {
    OrderLimitCell
}