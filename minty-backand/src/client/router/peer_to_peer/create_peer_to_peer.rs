use std::sync::Arc;

use axum::{extract::State, Json};

use crate::{
    db::peer_to_peer::{
        create_peer_to_peer::create_peer_to_peer,
        model::create_peer_to_peer::{CreatePeerToPeerBody, CreatePeerToPeerResponce},
    },
    error::AppResult,
    AppState,
};

#[utoipa::path(
    post,
    tag = "peer_to_peer",
    path = "/api/peer_to_peer/create_peer_to_peer",
    responses(
        (status = 200, description = "Создание поддерживаемых кошельков пользователя", body = CreatePeerToPeerBody),
    ),
    request_body=CreatePeerToPeerBody,
)]
pub async fn create_peer_to_peer_handler(
    State(state): State<Arc<AppState>>,
    Json(body): Json<CreatePeerToPeerBody>,
) -> AppResult<Json<CreatePeerToPeerResponce>> {
    let connection = &mut state.db.get().expect("Failed connection to POOL");

    let responce = create_peer_to_peer(body, connection).await;

    Ok(Json(responce))
}
