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