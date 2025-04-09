'use client'

import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { SwitchButton } from './SwitchButton'
import { InputField } from './InputField'
import { SettingsDrawer } from './SettingsDrawer/SettingsDrawer'
import { BuySellButton } from './BuySellButton'
import { Balance } from './Balance'
import { ActionButton } from './ActionButton'
import { TokenHeader } from '@widgets/TokenHeader/ui/TokenHeader'
import { getTokenInfo } from '@pages/TokenPage/lib/getTokenInfo'
import { useParams } from 'react-router'
import DogeIcon from '@shared/assets/token/doge.webp';

function TokenTradePage() {
    const { id } = useParams();
    const [token, setToken] = useState<any>(null);
	const [action, setAction] = useState<'buy' | 'sell'>('buy')

	const onAction = () => {
		toast.success('You bought 2000 DOGE')
	}

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
                    />
        <div className="px-4 w-full relative flex flex-col h-full">
			<BuySellButton action={action} setAction={setAction} />

			<div className="flex flex-col items-center">
				<InputField token="ton" image={DogeIcon} label="~ $240" />
				<SwitchButton />
				<InputField pic="dollar" label="~ 10000 DOGE" />
			</div>

			<Balance token="ton" amount={1.1} amountInUsd={10.1} />

			<ActionButton action={action} onClick={onAction} />

			<SettingsDrawer />
		</div>
        </>
	)
}

export {
    TokenTradePage
}
