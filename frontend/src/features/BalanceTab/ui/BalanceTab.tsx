import { AddWalletBanner } from "@entities/AddWalletBanner/ui/AddWalletBanner"
import { AssetsList } from "@entities/AssetsList/ui/AssetsList"
import { BalanceIndicator } from "@entities/BalanceIndicator/ui/BalanceIndicator"
import { CurrencyPopover, CurrencyPopoverProps } from "@entities/CurrencePopover/ui/CurrencePopover"
import { DepositWithdrawDrawer } from "@entities/DepositWithdrawDrawer/ui/DepositWithdrawDrawer"
import { useWallet } from "@features/Wallet/lib/useWallet"
// import { useTonWallet } from "@tonconnect/ui-react"
import { useEffect, useState } from "react"


function BalanceTab() {
	const [currency, setCurrency] = useState<CurrencyPopoverProps['value']>('USD')
	const {balance, priceChanged} = useWallet({
		balanceConvert: currency,
	});

	return (
		<div className="flex flex-col h-full overflow-hidden">
			<div className="px-4">
				<CurrencyPopover value={currency} onChange={setCurrency} />

				<BalanceIndicator balance={balance} change={priceChanged} />

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