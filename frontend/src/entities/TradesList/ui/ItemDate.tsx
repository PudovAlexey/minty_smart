import { formatDistanceToNow } from "date-fns"

export type ItemDateProps = {
	date: number
}

export const ItemDate = ({ date }: ItemDateProps) => {
	return (
		<div className="opacity-50 w-6">
			{formatDistanceToNow(String(date).length > 10 ? date : date * 1000)}
		</div>
	)
}
