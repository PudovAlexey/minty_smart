use bigdecimal::BigDecimal;
use diesel::prelude::QueryableByName;
use serde::{Deserialize, Serialize};

use super::shared::OperationType;

pub struct GetPeerToPeerListArgs {
    pub page: Option<u64>,
    pub page_size: Option<u64>,
    pub search_value: Option<String>,
    pub operation_type: OperationType,
}

#[derive(Serialize, Deserialize, QueryableByName, Debug, Clone)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct GetPeerToPeerListResponse {
    #[diesel(sql_type = diesel::sql_types::Uuid)]
    pub id: uuid::Uuid,
    #[diesel(sql_type = diesel::sql_types::Text)]

    pub merchant_name: String,
    #[diesel(sql_type = diesel::sql_types::Text)]

    pub merchant_avatar: String,

    #[diesel(sql_type = diesel::sql_types::Decimal)]
    pub merchant_rating: BigDecimal,

    #[diesel(sql_type = diesel::sql_types::Integer)]
    pub merchant_success_transactions: i32,

    #[diesel(sql_type = diesel::sql_types::Decimal)]
    pub asset_amount: BigDecimal,

    #[diesel(sql_type = diesel::sql_types::Decimal)]
    pub asset_limit_from: BigDecimal,

    #[diesel(sql_type = diesel::sql_types::Decimal)]
    pub asset_limit_to: BigDecimal,

    #[diesel(sql_type = diesel::sql_types::Text)]
    pub operation_type: String,
}