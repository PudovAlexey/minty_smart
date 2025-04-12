use borsh::{
    BorshSerialize,
    BorshDeserialize
};
use solana_program::pubkey::Pubkey;

#[derive(BorshSerialize, BorshDeserialize, Clone, Debug)]
pub struct  SuppliedTokenAccount {
    pub name: String,
    pub symbol: String,
    pub descriminator: String,
    pub token_mint: Pubkey,
}

impl SuppliedTokenAccount {
    pub fn init_space(name: &str, symbol: &str, descriminator: &str) -> usize {
        let name_syze = 4 + name.as_bytes().len();
        let descriminator_syze = 4 + descriminator.as_bytes().len();
        let symbol_size = 4 + symbol.as_bytes().len();
        let next_chang_id = std::mem::size_of::<Pubkey>();

        name_syze + descriminator_syze + symbol_size + next_chang_id
    }
}

#[derive(BorshSerialize, BorshDeserialize, Clone, Debug)]
pub struct SupliedTolenPricePair {
    pub supplied_token_account: Pubkey,
    pub market_exchange_address: Pubkey,
    pub exchange_pair: String,
}

impl SupliedTolenPricePair {
    pub fn init_space(exchange_pair: &String) -> usize {
        let name_size = 4 + exchange_pair.as_bytes().len();
        let market_exchange_address_size = std::mem::size_of::<Pubkey>();
        let exchange_price_account = std::mem::size_of::<Pubkey>();

        name_size + exchange_price_account + market_exchange_address_size
    } 
}