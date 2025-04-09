import { Connection, GetProgramAccountsFilter, Keypair, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";
import bs58 from 'bs58';
import { TokenMintModel } from "../models/TokenMintModel";

class CreateSuppliedTokenInstructions {
    programAddress: PublicKey;
    connection: Connection;

    constructor(programAddress: PublicKey, connection: Connection) {
        this.programAddress = programAddress;
        this.connection = connection;
    }



    async processCreateSuppliedTokenTransaction(value: {
        name: string,
        symbol: string,
        mint: string
    }) {
        const transactionData = new TokenMintModel(value).serialize();

        let keypair = Keypair.generate();
        const airdropSignature = await this.connection.requestAirdrop(keypair.publicKey, 2 * 1e9); // Запрос 2 SOL
        await this.connection.confirmTransaction(airdropSignature);

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

        const tx = new Transaction().add(insruction);

        return await sendAndConfirmTransaction(this.connection, tx, [keypair]);

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