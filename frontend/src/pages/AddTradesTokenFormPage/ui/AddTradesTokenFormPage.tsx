import { Button } from "@shared/ui/Button/Button"
import { Input } from "@shared/ui/Input/Input"
import { useState } from "react"
import { useCreateSuppliedTokenHandler } from "@shared/api/api_schema/queries";

type FormData = {
    name: string
    symbol: string,
    mint: string,
    marketExchangeAddress: string,
    tokenPair: string
}

function AddTradesTokenFormPage() {
    const {mutate} = useCreateSuppliedTokenHandler();

    const [formData, setFormData] = useState<FormData>({
        name: 'USD Coin',
        symbol: 'USDC',
        mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        marketExchangeAddress: "GcoKtAmTy5QyuijXSmJKBtFdt99e6Buza18Js7j9AJ6e",
        tokenPair: 'USDT/USD',
        
    });

    const handleTradesTokenSubmit = async () => {
        mutate({
            body: {
                market_address: formData.marketExchangeAddress,
                mint_address: formData.mint,
                name: formData.name,
                symbol: formData.symbol,
                token_pair: formData.tokenPair,
            }
        })
    }


    return (
        <div>
            <div>
                <Input onChange={(evt) => setFormData({ ...formData, name: evt.target.value })} value={formData.name} placeholder="Название токена" />
                <Input onChange={(evt) => setFormData({ ...formData, symbol: evt.target.value })} value={formData.symbol} placeholder="Символ токена" />
                <Input onChange={(evt) => setFormData({ ...formData, mint: evt.target.value })} value={formData.mint} placeholder="Минт адрес токена токена" />
                <Input onChange={(evt) => setFormData({ ...formData, marketExchangeAddress: evt.target.value })} value={formData.marketExchangeAddress} placeholder="Адрес цены токена на маркете serum" />
                <Input onChange={(evt) => setFormData({ ...formData, tokenPair: evt.target.value })} value={formData.tokenPair} placeholder="Название торговой пары" />
            </div>
            <Button onClick={handleTradesTokenSubmit}>Добавить токен</Button>
        </div>
    )
}

export default AddTradesTokenFormPage;