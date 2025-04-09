import { useCallback, useEffect, useState } from "react"
import { getTokenInfo2 } from "../lib/handlers/getTokenInfo2"
import { CardSm } from "@entities/CardSm/ui/CardSm";
import { Statistics } from "@entities/Statistics/ui/Statistics";
import { Description } from "./TokenDescription";
import { Address } from "./TokenAddress";
import { Links } from "./TokenLinks";
import { Created } from "./TokenCreated";

function TokenInfo() {
    const [token, setToken] = useState<any>(null);
    
    const handleInitToken = useCallback(async () => {
        const token = await getTokenInfo2();

        setToken(token);
        
    }, []);

    
        useEffect(() => {
            handleInitToken()
        }, [handleInitToken]);

    if (!token) {
        return null;
    }


	return (
		<div className="px-4 w-full overflow-y-auto scrollbar-hide pb-24">
			<div className="grid w-full grid-cols-2 gap-3 mb-3">
				<CardSm
					title="liquidity"
					value={token.liquidity.value}
					usd
					change={token.liquidity.change}
					chart={token.liquidity.chart}
				/>
				<CardSm
					title="market cap"
					value={token.marketCap.value}
					usd
					change={token.marketCap.change}
					chart={token.marketCap.chart}
				/>
				<CardSm
					title="holders"
					value={token.holders.value}
					change={token.holders.change}
					chart={token.holders.chart}
				/>
				<CardSm
					title="fdv"
					value={token.fdv.value}
					usd
					change={token.fdv.change}
					chart={token.fdv.chart}
				/>
				<CardSm title="txns" value={token.txns} />
				<CardSm title="daily txns" value={token.dailyTxns} />
			</div>
			<Statistics buys={token.buys} sells={token.sells} />

			<Description description={token.description} />

			<Address address={token.address} />

			<Created created={token.created} />

			<Links {...token.links} />
		</div>
	)
}

export {
    TokenInfo
}