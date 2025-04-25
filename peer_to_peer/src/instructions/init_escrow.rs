use borsh::BorshSerialize;
use solana_program::{
    account_info::{next_account_info, AccountInfo}, borsh1::try_from_slice_unchecked, entrypoint::ProgramResult, msg, program::invoke, program_error::ProgramError, pubkey::Pubkey, sysvar::{
        rent::Rent, Sysvar,
    }
};

use crate::state::Escrow;

pub fn process_init_escrow(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    amount: u64,
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();

    let initializer = next_account_info(accounts_iter)?;
    
    let temp_token_account = next_account_info(accounts_iter)?;

    let token_to_receive_account = next_account_info(accounts_iter)?;

    let escrow_account = next_account_info(accounts_iter)?;

    let account_rent = next_account_info(accounts_iter)?;

    let token_program = next_account_info(accounts_iter)?;

    if !initializer.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }



    if *token_to_receive_account.owner != spl_token::id() {
        return Err(ProgramError::IncorrectProgramId);
    }



    let rent = &Rent::from_account_info(account_rent)?;

    if !rent.is_exempt(escrow_account.lamports(), escrow_account.data_len()) {
        return Err(ProgramError::AccountAlreadyInitialized);
    }

    // let mut escrow_info = Escrow::unpack_unchecked(&escrow_account.try_borrow_data()?)?;

    let mut escrow_info = try_from_slice_unchecked::<Escrow>(&escrow_account.data.borrow()).unwrap();

    if escrow_info.is_initialized {
        return Err(ProgramError::AccountAlreadyInitialized);
    }

    escrow_info.is_initialized = true;
    escrow_info.initializer_pubkey = *initializer.key;
    escrow_info.temp_token_account_pubkey = *temp_token_account.key;
    escrow_info.initializer_token_to_receive_account_pubkey = *token_to_receive_account.key;
    escrow_info.expected_amount = amount;

    escrow_info.serialize(&mut &mut escrow_account.data.borrow_mut()[..])?;

    let (pda, _nonce) = Pubkey::find_program_address(
        &[b"escrow", temp_token_account.key.as_ref()], 
        program_id
    );


    let owner_exchange_ix = spl_token::instruction::set_authority(
        token_program.key,
        temp_token_account.key,
        Some(&pda),
        spl_token::instruction::AuthorityType::AccountOwner,
        initializer.key,
        &[&initializer.key],
    )?;

    msg!("Calling the token program to transfer token account ownership...");

    invoke(
        &owner_exchange_ix,
        &[
            temp_token_account.clone(),
            initializer.clone(),
            token_program.clone(),
        ]
    )?;

    Ok(())
}