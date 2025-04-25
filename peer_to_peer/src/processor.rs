use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::program_error::ProgramError;

#[derive(BorshDeserialize, BorshSerialize)]
pub struct ProcessInitializeExchangeData {
    pub amount: u64
}

pub enum ProcessInstruction {
    ProcessInitializeExchange(ProcessInitializeExchangeData),
    ProcessExchange(ProcessInitializeExchangeData)
}

impl ProcessInstruction {
    pub fn  unpack(input: &[u8]) -> Result<Self, ProgramError> {
        let (&variant, rest) = input
        .split_first()
        .ok_or(ProgramError::InvalidInstructionData)?;

    match variant {
        0 => {
            let data = ProcessInitializeExchangeData::try_from_slice(rest)?;

            Ok(Self::ProcessInitializeExchange((data)))
        },
        1 => {
            let data = ProcessInitializeExchangeData::try_from_slice(rest)?;

            Ok(Self::ProcessExchange((data)))
        },
        _ => Err(ProgramError::InvalidInstructionData)
    }
    }
}