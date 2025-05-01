use diesel::prelude::*;
use chrono::NaiveDateTime;
use bigdecimal::BigDecimal;
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

#[derive(Queryable, Selectable)]
#[diesel(table_name = crate::schema::supplied_token)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct SuppliedTokenSchema {
    pub id: uuid::Uuid,
    pub name: String,
    pub symbol: String,
    pub token_mint_address: String,
    pub image_id: Option<uuid::Uuid>,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}

#[derive(Queryable, Selectable)]
#[diesel(table_name = crate::schema::market_pair)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct MarketPair {
   pub id: uuid::Uuid,
   pub exchange_market_address: String,
   pub exchange_pair_name: String,
   pub token_a: uuid::Uuid,
   pub token_b: uuid::Uuid,
   pub created_at: NaiveDateTime,
}

#[derive(Queryable, Selectable, Debug)]
#[diesel(table_name = crate::schema::market_pair_history)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct MarketPairHistory {
   pub id: uuid::Uuid,
   pub pair_id: uuid::Uuid,
   pub current_price: BigDecimal,
   pub created_at: NaiveDateTime,
}


#[derive(Serialize, Deserialize, QueryableByName, Debug, Clone)]
pub struct GetMarketPairDatabaseResponse {
   #[diesel(sql_type = diesel::sql_types::Uuid)]
  pub id: uuid::Uuid,
   #[diesel(sql_type = diesel::sql_types::Nullable<diesel::sql_types::Text>)]
    pub image_url: Option<String>,
    
    #[diesel(sql_type = diesel::sql_types::Text)]
    pub name: String,
    
    #[diesel(sql_type = diesel::sql_types::Text)]
    pub symbol: String,
    
    #[diesel(sql_type = diesel::sql_types::Text)]
    pub mint_address: String,
    
    #[diesel(sql_type = diesel::sql_types::Text)]
    pub historical_prices: String,
}


#[derive(Queryable, Selectable, Insertable)]
#[diesel(table_name = crate::schema::supplied_token)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct CreateSuppliedTokenSchema {
   pub name: String,
   pub symbol: String,
   pub token_mint_address: String,
   pub image_id: Option<uuid::Uuid>,
}


#[derive(Queryable, Selectable, Insertable)]
#[diesel(table_name = crate::schema::image)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct CreateImageSchema {
   pub image_url: String,
}

#[derive(Serialize, Deserialize, ToSchema)]
pub struct CreateSuppliedTokenSchemaBody {
   pub name: String,
   pub symbol: String,
   pub mint_address: String,
   pub market_address: String,
   pub token_pair: String,
   pub image_url: String,
 }

 pub struct GetUpdateTokenPairBody {
   pub limit: i64,
   pub offset: i64
 }


 #[derive(Debug, Clone, Serialize, Deserialize, ToSchema)]
 pub struct MarketPairToPriceUpdate {
   pub id: uuid::Uuid,

   pub marketpair_id: uuid::Uuid,
   
   #[schema(value_type = f64)]
   pub new_price: BigDecimal,
}

#[derive(Serialize, Deserialize, QueryableByName, Debug, Clone)]
pub struct GetActiveTokens {
   #[diesel(sql_type = diesel::sql_types::Uuid)]
   pub id: uuid::Uuid,

   #[diesel(sql_type = diesel::sql_types::Text)]
   pub name: String,

   #[diesel(sql_type = diesel::sql_types::Text)]
   pub mint_address: String,

   #[diesel(sql_type = diesel::sql_types::Uuid)]
   pub marketpair_id: uuid::Uuid,
}
 