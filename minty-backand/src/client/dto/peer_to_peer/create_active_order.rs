use bigdecimal::BigDecimal;
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;


#[derive(Serialize, Deserialize, ToSchema)]
pub struct CreateMerchantActiveOrderBody {
    pub escrow_address: String,
    #[schema(value_type = f64)]
    pub order_amount: BigDecimal,
    pub order_id: uuid::Uuid,
}

#[derive(Serialize, Deserialize, ToSchema)]
pub struct CreateMerchantActiveOrderResponce {
    pub id: uuid::Uuid,
}