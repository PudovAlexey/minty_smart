import { ArrowCircleRight } from "@shared/assets/icons"
import { Link } from "react-router"
import AbstractBanner from '@shared/assets/abstract/abstract/banner.webp';

function DexBanner() {
	return (
		<div className="h-32 rounded-18 inline min-w-[331px] bg-popover relative pl-[18px] py-[22px] ml-4 last:mr-4">
			<div className="font-bold text-primary-foreground">
				Earn points in DEX
			</div>
			<p className="font-medium text-xs mb-4">
				Get bonuses for trading <br /> on our exchange
			</p>

			<Link
				to="/"
				className="font-medium text-xs flex items-center justify-start gap-1"
			>
				More
				<ArrowCircleRight width={14} height={14} className='stroke-positive' />
			</Link>

			<img
				src={AbstractBanner}
				height={128}
				width={128}
				alt="abstact"
				className="absolute right-0 top-0 h-full"
			/>
		</div>
	)
}

export {
    DexBanner
}