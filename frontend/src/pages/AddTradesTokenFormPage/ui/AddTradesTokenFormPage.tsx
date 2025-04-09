import { suppliedTokensDeserialize, TokenMintModel } from "@features/TokenMint/model/TokenMintModel"
import { Button } from "@shared/ui/Button/Button"
import { Input } from "@shared/ui/Input/Input"
import bs58 from 'bs58';
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js"
import { useState } from "react"
import { useInstructionsContext } from "@app/context/InstructionsContext/InstructionsContext";

type FormData = {
    name: string
    symbol: string,
    mint: string
}

const PROGRAM_ADDRESS = new PublicKey('6SM1NfcXepFQrCBdVufe93DRnmKrWz6Dg8mk8ixsRFqr');
const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

function AddTradesTokenFormPage() {
    const {suppliedTokenInstructions} = useInstructionsContext();

    const [formData, setFormData] = useState<FormData>({
        name: 'USD Coin',
        symbol: 'USDC',
        mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
    });

    const handleTradesTokenSubmit = async () => {
       await suppliedTokenInstructions?.processCreateSuppliedTokenTransaction(formData)
    }


    return (
        <div>
            <div>
                <Input onChange={(evt) => setFormData({ ...formData, name: evt.target.value })} value={formData.name} placeholder="Название токена" />
                <Input onChange={(evt) => setFormData({ ...formData, symbol: evt.target.value })} value={formData.symbol} placeholder="Символ токена" />
                <Input onChange={(evt) => setFormData({ ...formData, mint: evt.target.value })} value={formData.mint} placeholder="Минт адрес токена токена" />
            </div>
            <Button onClick={handleTradesTokenSubmit}>Добавить токен</Button>
        </div>
    )
}

export default AddTradesTokenFormPage;