use solana_program::{
    entrypoint::ProgramResult,
    entrypoint,
    account_info::AccountInfo,
    pubkey::Pubkey,
    program_error::ProgramError,
};

use crate::{instructions::{init_escrow::process_init_escrow, token_swap::token_swap}, processor::ProcessInstruction};

// use processor::ProcessInstruction;

entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let instruction = ProcessInstruction::unpack(instruction_data)?;

    match instruction {
        ProcessInstruction::ProcessInitializeExchange(exchange) => {
            process_init_escrow(program_id, accounts, exchange.amount)?
        },
        ProcessInstruction::ProcessExchange(exchange) => {
            token_swap(program_id, accounts,exchange.amount)?
        },
        _ => Err(ProgramError::InvalidInstructionData)?,
    }
    
    Ok(())
}