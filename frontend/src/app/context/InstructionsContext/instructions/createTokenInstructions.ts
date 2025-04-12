import { Connection, GetProgramAccountsFilter, Keypair, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";
import bs58 from 'bs58';
import { TokenMintModel } from "../models/TokenMintModel";
import { Market } from "@project-serum/serum";
import { TokenTradesModel } from "../models/TokenTradesModel";
import { TokenListProvider } from '@solana/spl-token-registry';
// import { findMetadataPda, mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
// import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';

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

        const ix = await sendAndConfirmTransaction(this.connection, tx, [keypair]);


        console.log(ix, 'ix');
    }

    async getAllSearchingSuppliedTokens(search: string) {

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

        // const take

        return Promise.all(accounts.map(async (account) => {
            const [pda] = PublicKey.findProgramAddressSync([
                Buffer.from("token_pair"),
                Buffer.from("USDT/USD", 'utf-8')
            ], this.programAddress);

            const programInfo = await this.connection.getAccountInfo(pda);

            const accountData = new TokenTradesModel({ buffer: programInfo?.data }).deserialize();

            return {
                ...new TokenMintModel({ buffer: account.account.data }).deserialize(),
                marketAccount: accountData.market_exchange_address,
            }
        }, this));

    }


    public async getActualPriceAccount(market_exchange_address: PublicKey) {
        const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=92170db0-5a50-4860-910e-5beb6a94bdb7")
        let marketAddress = new PublicKey("9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin"); //old

        let market = await Market.load(connection, market_exchange_address, {}, marketAddress);

        let asks = await market.loadAsks(connection);

        const lastPrice = asks.getL2(1);

        return lastPrice[0][0];
    }
    
    public async getMintMetadata(mintAddress: PublicKey) {
        const tokenList = await new TokenListProvider().resolve();
        const tokens = tokenList.filterByClusterSlug('mainnet-beta').getList();
        
        const usdcMint = mintAddress.toBase58();
        const usdcToken = tokens.find(token => token.address === usdcMint);
        
        return usdcToken?.logoURI || null;
    }
}

export {
    CreateSuppliedTokenInstructions
}