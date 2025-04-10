import * as borsh from '@project-serum/borsh'
import { PublicKey } from '@solana/web3.js'

class TokenTradesModel {
    public market_exchange_address?: string
    public exchange_pair?: string
    public buffer?: string

    constructor(data: {market_exchange_address: string, exchange_pair: string}) {
        this.market_exchange_address = data.market_exchange_address
        this.exchange_pair = data.exchange_pair
    }

        brshSerializeSchema = borsh.struct([
            borsh.u8('variant'),
            borsh.publicKey('market_exchange_address'),
            borsh.str('exchange_pair')
        ])

        serialize() {
            if (this.market_exchange_address && this.exchange_pair) {
                const buffer = Buffer.alloc(1000);
                this.brshSerializeSchema.encode({
                    variant: 1,
                    market_exchange_address: new PublicKey(this.market_exchange_address),
                    exchange_pair: this.exchange_pair,
                }, buffer);
                return buffer.subarray(0, this.brshSerializeSchema.getSpan(buffer))
            } else {
                throw new Error('Name, Symbol and Mint are required')
            }
        }
}

export {
    TokenTradesModel
}