import { AddWalletBanner } from "@entities/AddWalletBanner/ui/AddWalletBanner"
import { AssetsList } from "@entities/AssetsList/ui/AssetsList"
import { BalanceIndicator } from "@entities/BalanceIndicator/ui/BalanceIndicator"
import { CurrencyPopover } from "@entities/CurrencePopover/ui/CurrencePopover"
import { DepositWithdrawDrawer } from "@entities/DepositWithdrawDrawer/ui/DepositWithdrawDrawer"
import { useTonWallet } from "@tonconnect/ui-react"
import { useEffect, useState } from "react"


function BalanceTab() {
	const wallet = useTonWallet();

	const [walletBalance, setWalletBalance] = useState<any | null>(0);
	const address = wallet?.account?.address;

	useEffect(() => {
		const url = `
		https://toncenter.com/api/v2/getAddressBalance?address=${address}`;
		if (address) {
			fetch(url)
				.then(async (response: any) => {
					const res = await response.json();
					setWalletBalance(parseFloat(res.result) / 1e9);
				})
				.catch((error) => console.error(error));
		}
	}, [address]);

	if (!wallet) {
		return <AddWalletBanner />
	}

	return (
		<div className="flex flex-col h-full overflow-hidden">
			<div className="px-4">
				<CurrencyPopover />

				<BalanceIndicator balance={walletBalance} change={14} />

				<div className="flex w-full justify-between gap-3.5 mb-6">
					<DepositWithdrawDrawer type="withdraw" />
					<DepositWithdrawDrawer type="deposit" />
				</div>
			</div>

			<AssetsList />
		</div>
	)
}

export {
	BalanceTab
}