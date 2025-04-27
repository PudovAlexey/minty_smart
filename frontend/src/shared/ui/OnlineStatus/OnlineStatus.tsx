import classNames from 'classnames';
import cls from './OnlineStatus.module.scss';

type OnlineStatusProps = {
    isOnline: boolean
}

function OnlineStatus({
    isOnline,
}: OnlineStatusProps) {
    return (
        <div className={classNames(cls.onlineStatus , {
            [cls.online]: isOnline,
            [cls.offline]: !isOnline
        })}/>
    )
}

export {
    OnlineStatus
}