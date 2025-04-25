import { Table as AndtTable, TableProps } from "antd";
import cls from './Table.module.scss';
import classNames from "classnames";

function Table({
    className,
    ...props
}: TableProps) {
    return (
        <AndtTable virtual={false} className={classNames(cls.table, className)} {...props} />
    )
}

export {
    Table
}