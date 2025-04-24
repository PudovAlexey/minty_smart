import { Button } from "@shared/ui/Button/Button";
import { Input } from "@shared/ui/Input/Input";
import { useParams } from "react-router"
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useState } from "react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

function WithdrawPage() {
    const [transactionLoading, setTransactionLoading] = useState(false);
    const { connection } = useConnection();
    const [receiptAddress, setRecipientAddress] = useState('');
    const [amount, setAmount] = useState('');

    const { wallet, publicKey, sendTransaction } = useWallet();

    const handleWithdraw = async () => {
        if (!publicKey || !receiptAddress || !amount) {
            console.log('Заполните все поля');
            return;
        }

        setTransactionLoading(true);

        try {
            const recipientPubkey = new PublicKey(receiptAddress);
            const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;

            if (isNaN(lamports)) {
                // throw new Error('Некорректная сумма');
            }

            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: recipientPubkey,
                    lamports,
                })
            );

            const signature = await sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature, 'confirmed');

            console.log(`Транзакция успешна! Сигнатура: ${signature}`);
        } catch (error) {
            console.log(`Ошибка: ${error instanceof Error ? error.message : String(error)}`);
        } finally {
            setTransactionLoading(false);
        }
    };


    return (
        <div>
            <Input value={receiptAddress} onChange={(e) => setRecipientAddress(e.target.value)} placeholder="Адрес кошелька" />
            <Input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Сумма" />
            <Button onClick={handleWithdraw}>Подтвердить</Button>
        </div>
    )
}

export {
    WithdrawPage
}