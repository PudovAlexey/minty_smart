use borsh::BorshDeserialize;
use solana_program::{entrypoint::ProgramResult, program_error::ProgramError, pubkey::Pubkey};

use crate::dto::supplied_token::InitializeSuppliedTokenDto;

pub mod supplied_token;

pub enum ProcessInstructions {
    ProcessCreateChank(InitializeSuppliedTokenDto),
}

impl ProcessInstructions {
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError>  {

        let (&variant, rest) = input
        .split_first()
        .ok_or(ProgramError::InvalidInstructionData)?;

    match variant {
        0 => {
            let data = InitializeSuppliedTokenDto::try_from_slice(rest)?;

            Ok(Self::ProcessCreateChank(InitializeSuppliedTokenDto {
                ..data
            }))
        },
        _ => return Err(ProgramError::InvalidInstructionData),
    }
    }

}