use crate::error::AppResult;
use axum::Json;

use diesel::Selectable;
use serde::{Deserialize, Serialize};
use utoipa::{OpenApi, ToSchema};


#[derive(ToSchema, Serialize, Deserialize)]
pub struct TestResponse {
    pub id: String,
    pub name: String,
}



// #[derive(OpenApi)]
// #[openapi(
//     paths(create_supplied_token_handler)
// )]

#[utoipa::path(
    get,
    tag = "supplied_token",
    path = "api/supplied_token/supplied_token",
    responses(
        (status = 200, description = "Количество коллекций для активных кошельков текущего пользователя", body = TestResponse),
        (status = 500, description = "Internal server error")
    )
)]
pub async fn create_supplied_token_handler() -> AppResult<Json<TestResponse>> {
    // "Hello, World!"

    Ok(Json(TestResponse {
        id: "1".to_string(),
        name: "test".to_string()
    }))
}