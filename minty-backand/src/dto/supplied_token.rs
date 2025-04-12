use solana_program::pubkey::Pubkey;
use borsh::{BorshDeserialize, BorshSerialize};


#[derive(BorshDeserialize, BorshSerialize)]
pub struct InitializeSuppliedTokenDto {
    pub name: String,
    pub symbol: String,
    pub token_mint: Pubkey,
}

#[derive(BorshDeserialize, BorshSerialize)]
pub struct SupliedTolenPricePairDto {
    pub market_exchange_address: Pubkey,
    pub exchange_pair: String,
}