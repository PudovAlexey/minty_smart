use std::sync::Arc;

use axum::{extract::State, Json};

use crate::{client::dto::peer_to_peer::create_active_order::{CreateMerchantActiveOrderBody, CreateMerchantActiveOrderResponce}, db::peer_to_peer::model::create_peer_to_peer::{CreatePeerToPeerBody, CreatePeerToPeerResponce}, error::AppResult, service::peer_to_peer::create_active_order::create_active_order, AppState};



#[utoipa::path(
    post,
    tag = "peer_to_peer",
    path = "/api/peer_to_peer/create_active_order",
    request_body=CreateMerchantActiveOrderBody,
)]
pub async fn create_active_order_handler(
    State(state): State<Arc<AppState>>,
    Json(body): Json<CreateMerchantActiveOrderBody>,
) -> AppResult<Json<CreateMerchantActiveOrderResponce>> {

    let connection = &mut state.db.get()
    .expect("Failed connection to POOL");

    let active_order_responce = create_active_order(
        body,
        connection
    ).await;

    Ok(Json(active_order_responce))
    
}