import { TradesList } from "@entities/TradesList/ui/TradesList"
import { TradesTabletHeader } from "@features/TradesFilter/TradesHeaderTable"
import { TradesFilter } from "@features/TradesFilter/ui/TradesFilter"
import { getTokenTrades } from "../lib/getTokenTrades"
import { useCallback, useEffect, useState } from "react"

function TokenTrades() {
	const [tokenTrades, setTokenTrades] = useState<any>(null);
	
	const handleGetTrades = useCallback(async () => {
		const trades = await getTokenTrades();

		setTokenTrades(trades);

	}, []);


	useEffect(() => {
		handleGetTrades();
	}, []);

	if (!tokenTrades) {
		return null;
	}

	return (
		<div className="h-full flex flex-col overflow-y-auto scrollbar-hide bg-foreground/5 w-full rounded-t-24 p-4">
			<TradesFilter />
			<TradesTabletHeader />
			<TradesList trades={tokenTrades} />
		</div>
	)
}

export {
    TokenTrades
}