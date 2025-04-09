import { ChainArticle } from "@entities/ChainArticle/ui/ChainArticle"
import { ArrowCircleRight, ArrowThin } from "@shared/assets/icons"
import { cn } from "@shared/lib/utils/cn"
import { Button } from "@shared/ui/Button/Button"
import { Drawer, DrawerContent, DrawerTrigger } from "@shared/ui/Drawer/ui/Drawer"
import { Link } from "react-router"

type DepositWithdrawDrawerProps = {
	type: 'deposit' | 'withdraw'
}

export const DepositWithdrawDrawer = ({ type }: DepositWithdrawDrawerProps) => {
	const icon = (
		<ArrowCircleRight className="stroke-foreground opacity-50 w-6 h-6" />
	)

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button className="px-0 w-full gap-0.5 capitalize">
					<ArrowThin
						className={cn(
							'stroke-accent',
							type === 'deposit' ? 'rotate-180' : 'rotate-0',
						)}
					/>
					{type}
				</Button>
			</DrawerTrigger>
			<DrawerContent className="to-[#1D2025] gap-3">
				<Link to={`/wallet/${type}/sol`}>
					<ChainArticle
						token="sol"
						title={`${type} SOL`}
						description="Solana blockchain"
						icon={icon}
					/>
				</Link>
				<Link to={`/wallet/${type}/ton`}>
					<ChainArticle
						token="ton"
						title={`${type} TON`}
						description="TON blockchain"
						icon={icon}
					/>
				</Link>
			</DrawerContent>
		</Drawer>
	)
}
