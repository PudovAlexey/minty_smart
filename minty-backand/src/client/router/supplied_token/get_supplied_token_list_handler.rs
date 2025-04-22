use std::sync::Arc;

use axum::{extract::{
    State,
    Query,
}, Json};
use chrono::NaiveDateTime;

use crate::{client::dto::supplied_token::get_supplied_token_list_dto::{GetSuppliedListParams, GetSupplietListResponse, SortByVariants}, error::AppResult, service::supplied_token::get_supplied_token_list, AppState};



#[utoipa::path(
    get,
    tag = "supplied_token",
    path = "/api/supplied_token/get_supplied_token_list",
    params(
        ("page" = Option<i64>, Query, description = "Page number"),
        ("page_size" = Option<i64>, Query, description = "Number of items per page"),
        ("search_value" = Option<String>, Query, description = "Search value"),
        ("period" = Option<NaiveDateTime>, Query, description = "Period", example="2023-03-15T12:00:00"),
        ("sort_by" = Option<SortByVariants>, Query, description = "Period"),
    ),
    responses(
        (status = 200, description = "Get supplied token list", body = Vec<GetSupplietListResponse>),
    )

)]
pub async fn get_supplied_token_list_handler(
    params: Query<GetSuppliedListParams>,
    State(state): State<Arc<AppState>>,
) -> AppResult<Json<Vec<GetSupplietListResponse>>> {
    // use crate::sc;
    
    let connection = &mut state.db.get()
    .expect("Failed connection to POOL");

    let params =  GetSuppliedListParams {
        page: params.page,
        page_size: params.page_size,
        search_value: params.search_value.clone(),
        period: params.period,
        sort_by: params.sort_by.clone(),
    };

let supplied_token_list = get_supplied_token_list(params, connection).await?;

    Ok(Json(supplied_token_list))
}