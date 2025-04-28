pub mod get_peer_to_peer_list;

use std::sync::Arc;

use utoipa::OpenApi;

use axum::{
    Router,
    routing::{get}
};

use crate::AppState;


#[derive(OpenApi)]
#[openapi(
    paths(),
    components(),
    tags(
        (name = "supplied_token", description = "supplien tokens description")
    )
)]
pub struct SuppliedTokenApiDoc;

pub fn supplied_token_routes() -> Router<Arc<AppState>> {
    Router::new()
    .route("/api/peer_to_peer", get(peer_to_peer))
    .route("/api/peer_to_peer", get(peer_to_peer))
}