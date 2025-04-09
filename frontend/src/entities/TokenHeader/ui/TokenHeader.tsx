import { WalletImport } from "@shared/assets/icons";
import { Link } from "react-router";

function HomeHeader() {
	return (
		<header className="pl-4 pt-3 pb-6 font-bold w-full flex items-center justify-between">
			<h1 className="text-xl">Market</h1>

			<Link
				to="/wallet?active_tab=wallet"
				className="w-[171px] rounded-l-full leading-none bg-gradient-to-r from-primary-foreground text-primary from-70% h-[42px] pl-3 flex items-center justify-start"
			>
				<WalletImport className="w-[18px] h-[18px] mr-1.5 fill-accent" />
				Add a wallet
			</Link>
		</header>
	)
}

export {
    HomeHeader
}
