import { Connection, GetProgramAccountsFilter, Keypair, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";
import bs58 from 'bs58';
import { TokenMintModel } from "../models/TokenMintModel";
import { Market } from "@project-serum/serum";
import { TokenTradesModel } from "../models/TokenTradesModel";

class CreateSuppliedTokenInstructions {
    programAddress: PublicKey;
    connection: Connection;

    constructor(programAddress: PublicKey, connection: Connection) {
        this.programAddress = programAddress;
        this.connection = connection;
    }



    private async _createSuppliedTokenInstruction(value: {
        name: string,
        symbol: string,
        mint: string
    }, keypair: Keypair) {
        const transactionData = new TokenMintModel(value).serialize();

        const [pda, bump] = await PublicKey.findProgramAddressSync([
            Buffer.from("supplied_token"),
            Buffer.from(value.name, 'utf-8'),
        ], this.programAddress);

        const insruction = new TransactionInstruction({
            keys: [
                {
                    pubkey: keypair.publicKey,
                    isSigner: true,
                    isWritable: false,
                },
                {
                    pubkey: pda,
                    isSigner: false,
                    isWritable: true,
                },
                {
                    pubkey: SystemProgram.programId,
                    isSigner: false,
                    isWritable: false,
                },
            ],
            programId: this.programAddress,
            data: transactionData,
        });

        return {
            insruction,
            pda,
        };

        // const tx = new Transaction().add(insruction);

        // return await sendAndConfirmTransaction(this.connection, tx, [keypair]);

    }

    private async _createExchangePairInstruction(value: {
        marketExchangeAddress: string,
        tokenPair: string,
        suppliedTokenAccountPda: PublicKey,
    }, keypair: Keypair) {

        const { marketExchangeAddress, tokenPair } = value;

        const transactionData = new TokenTradesModel({
            market_exchange_address: marketExchangeAddress,
            exchange_pair: tokenPair,
        }).serialize()

        const [pda, bump] = await PublicKey.findProgramAddressSync([
            Buffer.from("token_pair"),
            Buffer.from(tokenPair, 'utf-8'),
        ], this.programAddress);

        const insruction = new TransactionInstruction({
            keys: [
                {
                    pubkey: keypair.publicKey,
                    isSigner: true,
                    isWritable: false,
                },
                {
                    pubkey: value.suppliedTokenAccountPda,
                    isSigner: false,
                    isWritable: false,
                },
                {
                    pubkey: pda,
                    isSigner: false,
                    isWritable: true,
                },
                {
                    pubkey: SystemProgram.programId,
                    isSigner: false,
                    isWritable: false,
                },
            ],
            programId: this.programAddress,
            data: transactionData,
        });

        return {
            insruction,
            pda,
        };
    }

    async processInitializeTokenPairTransaction(value: {
        name: string,
        symbol: string,
        mint: string,
        marketExchangeAddress: string,
        tokenPair: string,
    }) {
        let keypair = Keypair.generate();
        const airdropSignature = await this.connection.requestAirdrop(keypair.publicKey, 2 * 1e9); // Запрос 2 SOL
        await this.connection.confirmTransaction(airdropSignature);

        const { pda, insruction: createSuppliedTokenInstruction } = await this._createSuppliedTokenInstruction(value, keypair);
        const { insruction: createExchangePairInstruction } = await this._createExchangePairInstruction({
            ...value,
            suppliedTokenAccountPda: pda,
        }, keypair)

        const tx = new Transaction()
        .add(createSuppliedTokenInstruction)
        .add(createExchangePairInstruction)

        const ix =await sendAndConfirmTransaction(this.connection, tx, [keypair]);


        console.log(ix, 'ix');
    }

    async getAllSearchingSuppliedTokens(search: string) {
        const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=92170db0-5a50-4860-910e-5beb6a94bdb7")
        // let marketAddress = new PublicKey("srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX"); //new
        let marketAddress = new PublicKey("9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin"); //old

        // const market = await connection.getAccountInfo(marketAddress);

        // console.log(market);
        let programAddress = new PublicKey("GcoKtAmTy5QyuijXSmJKBtFdt99e6Buza18Js7j9AJ6e");
        let market = await Market.load(connection, programAddress, {}, marketAddress);

        let bids = await market.loadBids(connection);
        let asks = await market.loadAsks(connection);


        for (let [price, size] of bids.getL2(20)) {
            console.log(price, size);
        }

        const tokenDescriminator = bs58.encode(Buffer.from("supplied_token"));


        const searchingFiler: GetProgramAccountsFilter[] = [];

        if (search) {
            const searchTokenName = bs58.encode(Buffer.from(search));
            searchingFiler.push(
                {
                    memcmp: {
                        offset: 4,
                        bytes: searchTokenName,
                        encoding: "base58"
                    }
                }
            )
        }

        const accounts = await this.connection.getProgramAccounts(this.programAddress,
            {
                filters: [
                    {
                        memcmp: {
                            offset: 24,
                            bytes: tokenDescriminator,
                            encoding: "base58"
                        }
                    },
                    ...searchingFiler,
                ]
            }
        );

        const accountsData = accounts.map((account) => {
            return new TokenMintModel({ buffer: account.account.data }).deserialize()
        });

        console.log(accounts, 'data');

        return accountsData

    }
}

export {
    CreateSuppliedTokenInstructions
}