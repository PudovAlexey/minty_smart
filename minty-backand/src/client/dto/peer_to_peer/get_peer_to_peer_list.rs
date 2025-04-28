use serde::{Deserialize, Serialize};
use bigdecimal::BigDecimal;
use chrono::NaiveDateTime;
use utoipa::ToSchema;

#[derive(Debug, Serialize, Deserialize, ToSchema)]
pub struct  GetPeerToPeerArgs {
    pub page: Option<u32>,
    pub page_size: Option<u32>,
    pub search_value: Option<String>,
    pub swap_token: Option<String>,
}


#[derive(Debug, Serialize, Deserialize, ToSchema)]
pub struct GetPeerToPeerListResponse {
    pub id: String,
    pub merchant: String,
    pub merchant_avatar: String,
    pub orders: u32,
    pub is_online: bool,
    #[schema(value_type = f64)]
    pub price: BigDecimal,
    pub available: u32,
    #[schema(value_type = f64)]
    pub order_limit: (BigDecimal, BigDecimal),
    pub last_time_update: NaiveDateTime,
    #[schema(value_type = f64)]
    pub successfull_deals_percent: BigDecimal,
    pub token: String,
}