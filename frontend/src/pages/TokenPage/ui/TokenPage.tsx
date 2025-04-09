import TokenChart from "@features/TokenChart/ui/TokenChart";
import { TokenInfo } from "@features/TokenInfo/ui/TokenInfo";
import { TokenTrades } from "@widgets/TokenTrades/ui/TokenTrades";
import { TokenHeader } from '@widgets/TokenHeader/ui/TokenHeader';
import { useParams, useSearchParams } from "react-router"
import { getTokenInfo } from "../lib/getTokenInfo";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TokenTabs } from "@entities/TokenTabs/ui/TokenTabs";

const tokenTabControls = [
    {
        label: 'Info',
        key: 'info',
        component: <TokenInfo />,
    },
    {
        label: 'Chart',
        key: 'chart',
        component: <TokenChart />,
    },
    {
        label: 'Trades',
        key: 'trades',
        component: <TokenTrades />
    },
    {
        label: 'Traders',
        key: 'traders',
        component: <div>Coming soon</div>
    }
];

function TokenPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [token, setToken] = useState<any>(null);
    const { id } = useParams();
    const currentTabItem = useMemo(() => searchParams.get('active_tab') || 'info', [searchParams]);

    const activeTab = useMemo(() => {
        const currentToken =  tokenTabControls.find(({key}) => key === currentTabItem);

        return currentToken?.component;
    }, [currentTabItem]);

    const handleSetToken = useCallback(async () => {
        const token = await getTokenInfo(id as string);
        setToken(token);
    }, [id]);

    useEffect(() => {
        handleSetToken()
    }, [handleSetToken]);

    if (!token) {
        return null;
    }


    return (

        <>
            <TokenHeader
                image={token.image}
                token={token.token}
                price={token.price}
                change={token.change}
                symbol={token.symbol}
                slug={id as string}
                showTokenStar
            />
            <TokenTabs 
            onTokenTabChange={(key) => {
                setSearchParams({
                    active_tab: key,
                })
            }}
            activeTab={currentTabItem} items={tokenTabControls}/>

            {activeTab}
        </>
    )
}

export {
    TokenPage
}