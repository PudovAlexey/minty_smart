use std::sync::Arc;

use axum::Router;
use utoipa::OpenApi;

use crate::AppState;

#[derive(OpenApi)]
#[openapi(
    paths(),
    components(),
    tags(
        (name = "user", description = "User related operations")
    )
)]
pub struct UserApiDoc;

pub fn user_routes() -> Router<Arc<AppState>> {
    Router::new()
    // .route(
    //     "/api/user/create_user",
    //     post()
    // )
    // route("/api/user/verify")
    // .route("/api/user/get_me", get)
    // .route("/api/user/get_user/:id", get)
}
