use diesel::prelude::*;
use bigdecimal::BigDecimal;

use super::shared::OperationType;

pub struct CreatePeerToPeerBody {
   pub description: String,
   pub operation_type: OperationType,
   pub merchant_id: uuid::Uuid,
   pub fiat_currency: String, 
   pub asset_type: uuid::Uuid,
   pub asset_amount: BigDecimal,
   pub asset_limit_from: BigDecimal,
   pub asset_limit_to: BigDecimal,
}



#[derive(Selectable, Insertable)]
#[diesel(table_name = crate::schema::merchant_order)]
pub struct CreatePeerToPeerSchema {
  pub description: String,
  pub operation_type: String,
  pub merchant_id: uuid::Uuid,
  pub fiat_currency: String, 
  pub asset_type: uuid::Uuid,
  pub asset_amount: BigDecimal,
  pub asset_limit_from: BigDecimal,
  pub asset_limit_to: BigDecimal,
}

impl From<CreatePeerToPeerBody> for CreatePeerToPeerSchema {
    fn from(value: CreatePeerToPeerBody) -> Self {
        Self {
            description: value.description,
            operation_type: value.operation_type.into(),
            merchant_id: value.merchant_id,
            fiat_currency: value.fiat_currency,
            asset_type: value.asset_type,
            asset_amount: value.asset_amount,
            asset_limit_from: value.asset_limit_from,
            asset_limit_to: value.asset_limit_to,
    }
}
}