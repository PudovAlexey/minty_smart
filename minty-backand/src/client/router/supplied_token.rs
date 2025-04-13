use std::sync::Arc;
use utoipa::OpenApi;

use axum::{
    Router,
    routing::{get},
};

pub mod create_supplied_token_handler;

use create_supplied_token_handler::{
    create_supplied_token_handler,
    TestResponse
};

use crate::AppState;

#[derive(OpenApi)]
#[openapi(
    paths(
        create_supplied_token_handler::create_supplied_token_handler,
    ),
    components(
        schemas(TestResponse)
    ),
    tags(
        (name = "supplied_token", description = "supplien tokens description")
    )
)]
pub struct SuppliedTokenApiDoc;

pub fn supplied_token_routes() -> Router<Arc<AppState>> {
    Router::new()
    .route("/", get(create_supplied_token_handler))
}