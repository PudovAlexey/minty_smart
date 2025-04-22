use std::sync::Arc;

use crate::{client::dto::supplied_token::create_supplied_token_dto::{CreateSuppliedTokenBody, CreateSuppliedTokenResponce}, error::AppResult, service::supplied_token::create_supplied_token, AppState};
use axum::{extract::State, Json};
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;


#[derive(ToSchema, Serialize, Deserialize)]
pub struct TestResponse {
    pub id: String,
    pub name: String,
}

#[utoipa::path(
    post,
    tag = "supplied_token",
    path = "/api/supplied_token/create_supplied_token",
    responses(
        (status = 200, description = "Создание поддерживаемых кошельков пользователя", body = CreateSuppliedTokenBody),
        (status = 500, description = "Internal server error")
    ),
    request_body=CreateSuppliedTokenBody,
)]
pub async fn create_supplied_token_handler(
    State(state): State<Arc<AppState>>,
    Json(body): Json<CreateSuppliedTokenBody>,
) -> AppResult<Json<CreateSuppliedTokenResponce>> {
    let connection = &mut state.db.get()
    .expect("Failed connection to POOL");

    let data = create_supplied_token(body, connection).await?;

    Ok(Json(data))
}