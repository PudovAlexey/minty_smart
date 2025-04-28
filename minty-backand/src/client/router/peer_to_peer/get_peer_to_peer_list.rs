use std::sync::Arc;

use bigdecimal::BigDecimal;
use chrono::NaiveDateTime;
use utoipa::ToSchema;
use axum::{extract::State, Json};

use crate::{client::dto::peer_to_peer::get_peer_to_peer_list::GetPeerToPeerListResponse, error::AppResult, AppState};

pub fn get_peer_to_peer_list(
    State(state): State<Arc<AppState>>,
    Json(body): Json<GetPeerToPeerListResponse>,
) -> AppResult<Vec<GetPeerToPeerListResponse>> {
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

    Ok(mock_data)
}