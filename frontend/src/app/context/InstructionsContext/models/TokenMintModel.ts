import * as borsh from '@project-serum/borsh'
import { PublicKey } from '@solana/web3.js'

class TokenMintModel {
    public name?: string
    public symbol?: string
    public mint?: string
    public buffer?: Buffer

    constructor(data: { name?: string, symbol?: string, mint?: string, buffer?: Buffer }) {
        this.name = data.name
        this.symbol = data.symbol
        this.mint = data.mint
        this.buffer = data.buffer
    }

    brshSerializeSchema = borsh.struct([
        borsh.u8('variant'),
        borsh.str('name'),
        borsh.str('symbol'),
        borsh.publicKey('token_mint'),
    ])

    borshDeserializeSchema = borsh.struct([
        borsh.str('name'),
        borsh.str('symbol'),
        borsh.str("descriminator"),
        borsh.publicKey('token_mint'),
    ])

    serialize() {
        if (this.name && this.symbol && this.mint) {
            const buffer = Buffer.alloc(1000);
            this.brshSerializeSchema.encode({
                variant: 0,
                name: this.name,
                symbol: this.symbol,
                token_mint: new PublicKey(this.mint),
            }, buffer);
            return buffer.subarray(0, this.brshSerializeSchema.getSpan(buffer))
        } else {
            throw new Error('Name, Symbol and Mint are required')
        }
    }

    deserialize(): {
        name: string,
        symbol: string,
        token_mint: PublicKey
    } {
        if (this.buffer) {
            return this.borshDeserializeSchema.decode(this.buffer)
        } else {
            throw new Error('Buffer is required')
        }

    }
}

export {
    TokenMintModel
}
