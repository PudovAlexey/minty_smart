import classNames from "classnames";
import cls from './Avatar.module.scss';
import AvatarIcon from '@shared/assets/icons/icons12/user.svg?react';

type AvatarProps = {
  src?: string;
  size?: 'xs' | 'small' | 'medium' | 'large';
  onClick?: () => void;
}

function Avatar({
  src,
  size = 'small',
  onClick,
}: AvatarProps) {

  return (
    <div  role='presentation' onClick={onClick} className={cls.avatarWrap}>
      {src ? (
        <img
          src={src}
          className={classNames(cls.defaultAvatar, {
            [cls.avatarLarge]: size === 'large',
            [cls.avatarMedium]: size === 'medium',
            [cls.avatar]: size === 'small',
          })}
        />
      ) : (
        <div className={classNames(cls.avatarIcon, {
          [cls.avatarLarge]: size === 'large',
          [cls.avatarMedium]: size === 'medium',
          [cls.avatar]: size === 'small',
          [cls.avatarXs]: size === 'xs',
        })}>
          <AvatarIcon />
        </div>
      )}
    </div>
  );
}

export {
  Avatar
}
