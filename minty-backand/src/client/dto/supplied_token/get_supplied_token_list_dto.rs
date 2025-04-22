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
    pub page: u32,
    pub page_size: u32,
    pub search_value: String,
    pub period: NaiveDateTime,
    pub sort_by: SortByVariants,
}

#[derive(Serialize, Deserialize, ToSchema)]
pub struct GetSupplietListResponse {
  pub  image_url: String,
  pub  name: String,
  pub  current_price: f32,
  pub  price_spread: f32,
  pub  history: Vec<f32>
}