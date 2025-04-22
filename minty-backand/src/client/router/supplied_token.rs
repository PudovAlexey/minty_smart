pub mod create_supplied_token_handler;
pub mod get_supplied_token_list_handler;

use std::sync::Arc;
use utoipa::OpenApi;

use axum::{
    routing::{get, post}, Router
};

use get_supplied_token_list_handler::get_supplied_token_list_handler;


use create_supplied_token_handler::{
    create_supplied_token_handler,
    TestResponse
};

use crate::{client::dto::supplied_token::create_supplied_token_dto::CreateSuppliedTokenBody, error::AppResult, service::supplied_token::price_update_queue, AppState};

#[derive(OpenApi)]
#[openapi(
    paths(
        get_supplied_token_list_handler::get_supplied_token_list_handler,
        create_supplied_token_handler::create_supplied_token_handler,
    ),
    components(
        schemas(TestResponse),
        schemas(CreateSuppliedTokenBody)
    ),
    tags(
        (name = "supplied_token", description = "supplien tokens description")
    )
)]
pub struct SuppliedTokenApiDoc;

pub fn supplied_token_routes() -> Router<Arc<AppState>> {
    Router::new()
    .route("/api/supplied_token/get_supplied_token_list", get(get_supplied_token_list_handler))
    .route("/api/supplied_token/create_supplied_token", post(create_supplied_token_handler))
}