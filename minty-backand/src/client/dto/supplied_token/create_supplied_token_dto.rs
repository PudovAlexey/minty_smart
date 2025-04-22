use uuid;

use serde::{Deserialize, Serialize};
use utoipa::ToSchema;


#[derive(Serialize, Deserialize, ToSchema)]
pub struct CreateSuppliedTokenBody {
  pub name: String,
  pub symbol: String,
  pub mint_address: String,
  pub market_address: String,
  pub token_pair: String,
}

#[derive(Serialize, Deserialize, ToSchema)]
pub struct CreateSuppliedTokenResponce {
    pub id: uuid::Uuid
}