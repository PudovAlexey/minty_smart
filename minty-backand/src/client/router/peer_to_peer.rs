pub mod create_active_order;
pub mod create_peer_to_peer;
pub mod get_peer_to_peer_list;

use std::sync::Arc;

use create_active_order::create_active_order_handler;
use create_peer_to_peer::create_peer_to_peer_handler;
use get_peer_to_peer_list::get_peer_to_peer_list;
use utoipa::OpenApi;

use axum::{
    routing::{get, post},
    Router,
};

use crate::{
    client::dto::{
        peer_to_peer::get_peer_to_peer_list::GetPeerToPeerListResponse,
        supplied_token::get_supplied_token_list_dto::GetSuppliedListParams,
    }, db::peer_to_peer::model::create_peer_to_peer::{CreatePeerToPeerBody, CreatePeerToPeerResponce}, AppState
};

#[derive(OpenApi)]
#[openapi(
    paths(
        get_peer_to_peer_list::get_peer_to_peer_list,
        create_active_order::create_active_order_handler,
        create_peer_to_peer::create_peer_to_peer_handler,
    ),
    components(
        schemas(GetPeerToPeerListResponse, GetSuppliedListParams),
        schemas(CreatePeerToPeerBody),
        schemas(CreatePeerToPeerResponce)
    ),
    tags(
        (name = "peer_to_peer", description = "peer to peer description")
    )
)]
pub struct PeerToPeerApiDoc;

pub fn peer_to_peer_routes() -> Router<Arc<AppState>> {
    Router::new()
        .route(
            "/api/peer_to_peer/get_peer_to_peer_list",
            get(get_peer_to_peer_list),
        )
        .route(
            "/api/peer_to_peer/create_active_order",
            post(create_active_order_handler),
        )
        .route(
            "/api/peer_to_peer/create_peer_to_peer",
            post(create_peer_to_peer_handler),
        )
    // .route("/api/peer_to_peer", get(peer_to_peer))
}
