use borsh::BorshSerialize;
use solana_program::{
    account_info::{next_account_info, AccountInfo}, borsh1::try_from_slice_unchecked, clock::Clock, entrypoint::ProgramResult, msg, program::{invoke, invoke_signed}, program_error::ProgramError, pubkey::Pubkey, rent::Rent, system_instruction, sysvar::Sysvar
};


use crate::{dto::supplied_token::{InitializeSuppliedTokenDto, SupliedTolenPricePairDto}, model::token_chank::SupliedTolenPricePair};
use crate::model::token_chank::SuppliedTokenAccount;

pub fn process_create_supplied_token(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    data: InitializeSuppliedTokenDto,
) -> ProgramResult {
    let InitializeSuppliedTokenDto {
        name,
        symbol,
        token_mint,
    } = data;

    let descrimintator = String::from("supplied_token");
    let accoounts_iter = &mut accounts.iter();

    let payer = next_account_info(accoounts_iter)?;
    let pda_chank_account = next_account_info(accoounts_iter)?;
    let system_program = next_account_info(accoounts_iter)?;

    msg!("starting to init supplied token account");

    // let mut pda_chank_account =
    // try_from_slice_unchecked::<SupportedTokens>(&pda_chank_account.data.borrow()).unwrap();

    if !pda_chank_account.is_writable {
        return Err(ProgramError::InvalidAccountData);
    }

    let size = SuppliedTokenAccount::init_space(&name, &symbol, &descrimintator);

    let rent = Rent::get()?;

    let required_lamports = rent.minimum_balance(size);

    let signers_seeds: &[&[u8]] = &[
        b"supplied_token",
        name.as_bytes(),
    ];

    let (pda, bump_seed) = Pubkey::find_program_address(signers_seeds, program_id);

    invoke_signed(
        &system_instruction::create_account(
            payer.key,          // Account paying for the new account
            pda_chank_account.key,              // Account to be created
            required_lamports,  // Amount of lamports to transfer to the new account
            size as u64,       // Size in bytes to allocate for the data field
            program_id,         // Set program owner to our program
        ),
        &[
            payer.clone(),
            pda_chank_account.clone(),
            system_program.clone(),
        ],
        &[&[
            b"supplied_token",
            name.as_bytes(),
            &[bump_seed],
        ]], // signer_seeds
    )?;

    let mut account_data =
    try_from_slice_unchecked::<SuppliedTokenAccount>(&pda_chank_account.data.borrow()).unwrap();

    account_data.name = name;
    account_data.symbol = symbol;
    account_data.token_mint = token_mint;
    account_data.descriminator = descrimintator;

    account_data.serialize(&mut &mut pda_chank_account.data.borrow_mut()[..])?;
    
    Ok(())
}

pub fn process_init_supplied_price(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    data: SupliedTolenPricePairDto
) -> ProgramResult {
    let SupliedTolenPricePairDto {
        market_exchange_address,
        exchange_pair,
    } = data;
    let accounts_iter = &mut accounts.iter();

    let payer = next_account_info(accounts_iter)?;
    let pda_token_account = next_account_info(accounts_iter)?;
    let pda_price_pair_account = next_account_info(accounts_iter)?;
    let system_program = next_account_info(accounts_iter)?;

    
    msg!("starting to pair token account");

    let size = SupliedTolenPricePair::init_space(&exchange_pair);

    let rent = Rent::get()?;

    let required_lamports = rent.minimum_balance(size);

    let signers_seeds: &[&[u8]] = &[
        b"token_pair",
        &exchange_pair.as_bytes(),
    ];

    let (pda, bump_seed) = Pubkey::find_program_address(signers_seeds, program_id);

    invoke_signed(
        &system_instruction::create_account(
            payer.key,          // Account paying for the new account
            pda_price_pair_account.key,              // Account to be created
            required_lamports,  // Amount of lamports to transfer to the new account
            size as u64,       // Size in bytes to allocate for the data field
            program_id,         // Set program owner to our program
        ),
        &[
            payer.clone(),
            pda_price_pair_account.clone(),
            system_program.clone(),
        ],
        &[&[
            b"token_pair",
            &exchange_pair.as_bytes(),
            &[bump_seed],
        ]], // signer_seeds
    )?;


    let mut account_data =
    try_from_slice_unchecked::<SupliedTolenPricePair>(&pda_price_pair_account.data.borrow()).unwrap();

    account_data.exchange_pair = exchange_pair;
    account_data.market_exchange_address = market_exchange_address;
    account_data.supplied_token_account = *pda_token_account.key;

    account_data.serialize(&mut &mut pda_price_pair_account.data.borrow_mut()[..])?;

    Ok(())
}