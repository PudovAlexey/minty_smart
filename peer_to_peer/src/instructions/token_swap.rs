use solana_program::{
    account_info::{next_account_info, AccountInfo}, borsh1::try_from_slice_unchecked, entrypoint::ProgramResult, msg, program::{invoke, invoke_signed}, program_error::ProgramError, program_pack::Pack, pubkey::Pubkey
};

use spl_token::state::Account as TokenAccount;

use crate::state::Escrow;

pub fn token_swap(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    amount_expected: u64,
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();

    // Чел, который принимает предложение
    let taker = next_account_info(accounts_iter)?;

    // аккаунт чела, куда будут зачислены средства
    let takers_sending_token_account = next_account_info(accounts_iter)?;

    // аккаунт другого челика, который будет принимать средства
    let takers_token_to_receive_account = next_account_info(accounts_iter)?;

    // пда тем токен аккаунта
    let pdas_temp_token_account = next_account_info(accounts_iter)?;

    // Аккаунт пользователя, который создает сделку
    let initializers_main_account = next_account_info(accounts_iter)?;

    // Аккаунт, куда будут зачислены средства
    let initializers_token_to_receive_account = next_account_info(accounts_iter)?;

    let escrow_account = next_account_info(accounts_iter)?;

    let token_program = next_account_info(accounts_iter)?;

    let pda_account = next_account_info(accounts_iter)?;

    let pdas_temp_token_account_info =
        TokenAccount::unpack(&pdas_temp_token_account.data.borrow())?;

    let mut escrow_info =
        try_from_slice_unchecked::<Escrow>(&escrow_account.data.borrow()).unwrap();

    let (pda, nonce) = Pubkey::find_program_address(
        &[b"escrow", pdas_temp_token_account.key.as_ref()],
        program_id,
    );

    if !taker.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }

    if amount_expected != pdas_temp_token_account_info.amount {
        return Err(ProgramError::MissingRequiredSignature);
    }

    if escrow_info.temp_token_account_pubkey != *pdas_temp_token_account.key {
        return Err(ProgramError::InvalidAccountData);
    }

    if escrow_info.initializer_pubkey != *initializers_main_account.key {
        return Err(ProgramError::InvalidAccountData);
    }

    if escrow_info.initializer_token_to_receive_account_pubkey
        != *initializers_token_to_receive_account.key
    {
        return Err(ProgramError::InvalidAccountData);
    }

    let transfer_to_initializer_ix = spl_token::instruction::transfer(
        token_program.key,
        takers_sending_token_account.key,
        initializers_token_to_receive_account.key,
        taker.key,
        &[&taker.key],
        escrow_info.expected_amount,
    )?;
    msg!("Calling the token program to transfer tokens to the escrow's initializer...");

    invoke(
        &transfer_to_initializer_ix,
        &[
            takers_sending_token_account.clone(),
            initializers_token_to_receive_account.clone(),
            taker.clone(),
            token_program.clone(),
        ],
    )?;

    let transfer_to_taker_ix = spl_token::instruction::transfer(
        token_program.key,
        pdas_temp_token_account.key,
        takers_token_to_receive_account.key,
        &pda,
        &[&pda],
        pdas_temp_token_account_info.amount,
    )?;

    msg!("Calling the token program to transfer tokens to the taker...");

    invoke_signed(
        &transfer_to_taker_ix,
        &[
            pdas_temp_token_account.clone(),
            takers_token_to_receive_account.clone(),
            pda_account.clone(),
            token_program.clone(),
        ],
        &[&[&b"escrow"[..], &[nonce]]],
    )?;

    let close_pdas_temp_acc_ix = spl_token::instruction::close_account(
        token_program.key,
        pdas_temp_token_account.key,
        initializers_main_account.key,
        &pda,
        &[&pda],
    )?;

    msg!("Calling the token program to close pda's temp account...");
    invoke_signed(
        &close_pdas_temp_acc_ix,
        &[
            pdas_temp_token_account.clone(),
            initializers_main_account.clone(),
            pda_account.clone(),
            token_program.clone(),
        ],
        &[&[&b"escrow"[..], &[nonce]]],
    )?;

    msg!("Closing the escrow account...");
    **initializers_main_account.try_borrow_mut_lamports()? = initializers_main_account
        .lamports()
        .checked_add(escrow_account.lamports())
        .ok_or(ProgramError::AccountNotRentExempt)?;
    **escrow_account.try_borrow_mut_lamports()? = 0;
    *escrow_account.try_borrow_mut_data()? = &mut [];


    Ok(())
}
