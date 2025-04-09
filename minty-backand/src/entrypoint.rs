use solana_program::{
    pubkey::Pubkey,
    account_info::AccountInfo,
    entrypoint::ProgramResult,
    entrypoint,
};

use crate::instructions::supplied_token::process_create_supplied_token;

use crate::instructions::ProcessInstructions;



entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let instruction = ProcessInstructions::unpack(instruction_data)?;

    match instruction {
        ProcessInstructions::ProcessCreateChank(chank) => {
            process_create_supplied_token(program_id, accounts, chank)?
        },

    }
    
    Ok(())
    // TODO
}