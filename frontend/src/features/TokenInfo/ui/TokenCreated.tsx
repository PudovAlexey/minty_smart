import { CardLg } from '@entities/Statistics/ui/CardLg'
import { formatDistanceToNowStrict } from 'date-fns'

export type CreatedProps = {
	created: number
}

export const Created = ({ created }: CreatedProps) => {
	return (
		<CardLg title="Created" className="mb-3">
			<div className="font-normal">
				{formatDistanceToNowStrict(
					String(created).length > 10 ? created : created * 1000,
				)}
			</div>
		</CardLg>
	)
}
