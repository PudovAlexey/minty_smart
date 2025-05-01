pub mod get_peer_to_peer_list;

use std::sync::Arc;

use get_peer_to_peer_list::get_peer_to_peer_list;
use utoipa::OpenApi;

use axum::{
    Router,
    routing::{get}
};

use crate::{client::dto::{peer_to_peer::get_peer_to_peer_list::GetPeerToPeerListResponse, supplied_token::get_supplied_token_list_dto::GetSuppliedListParams}, AppState};


#[derive(OpenApi)]
#[openapi(
    paths(
        get_peer_to_peer_list::get_peer_to_peer_list,
    ),
    components(
        schemas(GetPeerToPeerListResponse, GetSuppliedListParams)
    ),
    tags(
        (name = "peer_to_peer", description = "peer to peer description")
    )
)]
pub struct PeerToPeerApiDoc;

pub fn peer_to_peer_routes() -> Router<Arc<AppState>> {
    Router::new()
    .route("/api/peer_to_peer/get_peer_to_peer_list", get(get_peer_to_peer_list))
    // .route("/api/peer_to_peer", get(peer_to_peer))
}