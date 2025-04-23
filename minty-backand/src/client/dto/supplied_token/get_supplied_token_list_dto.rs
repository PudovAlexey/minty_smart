use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

#[derive(Serialize, Deserialize, ToSchema, Clone)]
pub enum SortByVariants {
    Trending,
    Top,
    Favorites
}


#[derive(Serialize, Deserialize, ToSchema)]
pub struct GetSuppliedListParams {
    pub page: Option<u32>,
    pub page_size: Option<u32>,
    pub search_value: Option<String>,
    pub period: Option<NaiveDateTime>,
    pub sort_by: Option<SortByVariants>,
}

#[derive(Serialize, Deserialize, ToSchema)]
pub struct GetSupplietListResponse {
  pub id: uuid::Uuid,
  pub  image_url: String,
  pub  symbol: String,
  pub  name: String,
  pub  current_price: f32,
  pub  price_spread: f32,
  pub  history: Vec<f32>
}