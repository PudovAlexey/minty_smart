pub mod supplied_token;
pub mod peer_to_peer;

use std::sync::Arc;

use axum::Router;
use peer_to_peer::{peer_to_peer_routes, PeerToPeerApiDoc};
use supplied_token::SuppliedTokenApiDoc;
use utoipa_swagger_ui::SwaggerUi;

use crate::AppState;

use utoipa::OpenApi;

#[derive(OpenApi)]
#[openapi(
    paths(),
    components(),
    // modifiers(&SecurityAddon),
    info(title = "Minty Api", description = "API description"),
    // tags(
    //     // (name = "users", description = "Users endpoints"),
    //     // (name = "wallets", description = "Wallets endpoints"),
    //     // (name = "notifications", description = "Notifications endpoints"),
    //     // (name = "pre-registration", description = "Pre-registration endpoints"),
    //     // (name = "collections", description = "Collections endpoints"),
    //     // (name = "nfts", description = "NFTs endpoints")
    // )
)]
pub struct ApiDoc;

pub fn create_router(shared_state: Arc<AppState>) -> Router {
    let mut openapi = ApiDoc::openapi();

    openapi.merge(SuppliedTokenApiDoc::openapi());
    openapi.merge(PeerToPeerApiDoc::openapi());

    Router::new()
    .merge(supplied_token::supplied_token_routes())
    .merge(peer_to_peer_routes())
    .merge(SwaggerUi::new("/swagger-ui").url("/api-doc/openapi.json", openapi.clone()))
    .with_state(Arc::clone(&shared_state))
}