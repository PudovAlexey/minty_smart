import { Progress } from '@shared/ui/Progress/ui/Progress'
import { CardLg } from './CardLg'

export type StatisticsProps = {
	buys: number
	sells: number
}

export const Statistics = ({ buys, sells }: StatisticsProps) => {
	const value = (buys / (buys + sells)) * 100

	return (
		<CardLg title="Statistic" className='mb-3'>
			<Progress value={value} />

			<div className="text-sm w-full leading-none">
				<div className="flex items-center justify-between font-medium opacity-50">
					<span>Buys</span>
					Sells
				</div>

				<div className="flex items-center justify-between font-bold mt-1">
					<span>{buys.toLocaleString()}</span>
					{sells.toLocaleString()}
				</div>
			</div>
		</CardLg>
	)
}
