use std::sync::Arc;

use bigdecimal::BigDecimal;
use chrono::NaiveDateTime;
use utoipa::ToSchema;
use axum::{extract::{Query, State}, Json};

use crate::{client::dto::{peer_to_peer::get_peer_to_peer_list::GetPeerToPeerListResponse, supplied_token::get_supplied_token_list_dto::GetSuppliedListParams}, error::AppResult, AppState};


#[utoipa::path(
    get,
    tag = "peer_to_peer",
    path = "api/peer_to_peer/get_peer_to_peer_list",
    params(
        ("page" = Option<i64>, description= "Page number"),
        ("page_size" = Option<i64>, description= "Page size"),
        ("search_value" = Option<i64>, description= "Page size"),
    ),
    responses(
        (status = 200, description = "Get supplied token list", body = Vec<GetPeerToPeerListResponse>),
    )
)]
pub async fn get_peer_to_peer_list(
    params: Query<GetSuppliedListParams>,
    State(state): State<Arc<AppState>>,
) -> AppResult<Json<Vec<GetPeerToPeerListResponse>>> {
    let mock_data: Vec<GetPeerToPeerListResponse> = Vec::from([
        GetPeerToPeerListResponse {
            id: String::from("1"),
            merchant: String::from(""),
            available: 31,
            merchant_avatar: String::from(""),
            orders: 32,
            is_online: true,
            price: BigDecimal::from(0),
            order_limit: (BigDecimal::from(0), BigDecimal::from(0)),
            last_time_update: NaiveDateTime::default(),
            successfull_deals_percent: BigDecimal::from(0),
            token: String::from(""),
        }
    ]);

    Ok(Json(mock_data))
}