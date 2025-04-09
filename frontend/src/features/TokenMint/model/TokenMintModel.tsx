import * as borsh from '@project-serum/borsh'
import { PublicKey } from '@solana/web3.js';
import { strict } from "assert";

class TokenMintModel {
    public name: string
    public symbol: string
    public mint: string

    constructor(data: { name: string, symbol: string, mint: string }) {
        this.name = data.name
        this.symbol = data.symbol
        this.mint = data.mint
    }

    borshInitializeSuppliedTokenSchema = borsh.struct([
        borsh.u8('variant'),
        borsh.str('name'),
        borsh.str('symbol'),
        borsh.publicKey('token_mint'),
    ])

    serialize() {
        try {
            const buffer = Buffer.alloc(1000); // Adjust size if needed
            this.borshInitializeSuppliedTokenSchema.encode({
                variant: 0,
                name: this.name,
                symbol: this.symbol,
                token_mint: new PublicKey(this.mint),
            }, buffer);

            return buffer.subarray(0, this.borshInitializeSuppliedTokenSchema.getSpan(buffer));
        } catch (e) {
            console.error("Serialization error:", e);
            return Buffer.alloc(0);
        }
    }

    getAccountData() {

    }
}

const borshInitializeSuppliedTokenSchema = borsh.struct([
    borsh.str('name'),
    borsh.str('symbol'),
    borsh.publicKey('token_mint'),
])




function suppliedTokensDeserialize(buffer: Buffer) {
    const data = borshInitializeSuppliedTokenSchema.decode(buffer);
    return data
}

export { TokenMintModel, suppliedTokensDeserialize }