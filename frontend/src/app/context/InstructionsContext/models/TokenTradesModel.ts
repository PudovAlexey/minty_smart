import * as borsh from '@project-serum/borsh'
import { PublicKey } from '@solana/web3.js'

class TokenTradesModel {
    public market_exchange_address?: string
    public exchange_pair?: string
    public buffer?: Buffer

    constructor(data: {market_exchange_address?: string, exchange_pair?: string, buffer?: Buffer}) {
        this.market_exchange_address = data.market_exchange_address
        this.exchange_pair = data.exchange_pair
        this.buffer = data.buffer
    }

        brshSerializeSchema = borsh.struct([
            borsh.u8('variant'),
            borsh.publicKey('market_exchange_address'),
            borsh.str('exchange_pair')
        ])

        brshDesereializeSchema = borsh.struct([
            borsh.publicKey('supplied_token_account'),
            borsh.publicKey('market_exchange_address'),
            borsh.str('exchange_pair'),
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


        deserialize(): {
            supplied_token_account: PublicKey,
            market_exchange_address: PublicKey,
            exchange_pair: string
        } {
            if (this.buffer) {
                return this.brshDesereializeSchema.decode(this.buffer)
            } else {
                throw new Error('Buffer is required')
            }
    
        }
}

export {
    TokenTradesModel
}