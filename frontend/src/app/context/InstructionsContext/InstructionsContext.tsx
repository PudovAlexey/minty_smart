import { Connection, PublicKey } from '@solana/web3.js';
import React, { PropsWithChildren, useContext, useMemo } from 'react';
import { CreateSuppliedTokenInstructions } from './instructions/createTokenInstructions';

type IstructionsContextValue = {
    connection: Connection,
    programAddress: PublicKey,
    suppliedTokenInstructions: CreateSuppliedTokenInstructions,
}

const connection = new Connection(import.meta.env.VITE_CONNECTION_URL, 'confirmed');
const PROGRAM_ADDRESS = new PublicKey(import.meta.env.VITE_PROGRAM_ADDRESS);

const InstructionsContext = React.createContext<Partial<IstructionsContextValue>>({});

function InstructionsContextProvider({
    children,
}: PropsWithChildren) {
    const suppliedTokenInstructions = useMemo(() => new CreateSuppliedTokenInstructions(PROGRAM_ADDRESS, connection), [connection, PROGRAM_ADDRESS]);

    return (
        <InstructionsContext.Provider value={useMemo(() => ({
            suppliedTokenInstructions,
            connection,
            programAddress: PROGRAM_ADDRESS,
        }), [suppliedTokenInstructions])}>
            {children}
        </InstructionsContext.Provider>
    )
}

function useInstructionsContext() {
    const context = useContext(InstructionsContext);
    if (!context) {
        throw new Error('useInstructionsContext must be used within a InstructionsContextProvider');
    }
    return context;
}

export {
    InstructionsContextProvider,
    useInstructionsContext
}