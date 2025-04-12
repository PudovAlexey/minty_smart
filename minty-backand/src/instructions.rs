use borsh::BorshDeserialize;
use solana_program::program_error::ProgramError;

use crate::dto::supplied_token::{InitializeSuppliedTokenDto, SupliedTolenPricePairDto};

pub mod supplied_token;

pub enum ProcessInstructions {
    ProcessCreateChank(InitializeSuppliedTokenDto),
    ProcessCreateExchangePair(SupliedTolenPricePairDto)
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
        1 => {
            let data = SupliedTolenPricePairDto::try_from_slice(rest)?;

            Ok(Self::ProcessCreateExchangePair(SupliedTolenPricePairDto {
                ..data
            }))
        }
        _ => return Err(ProgramError::InvalidInstructionData),
    }
    }

}