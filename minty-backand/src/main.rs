use std::net::SocketAddr;
use service::supplied_token::price_update_queue;
use tracing::info;

use std::sync::Arc;

use axum_server::Server;

use client::{router::create_router, socket_entry_point::socket_entry_point};
use db::connection_pool::{CreateConnectionPool, DbPool};

use crate::config::AppConfig;

// use tracing::info;

mod client;
mod config;
mod db;
mod entities;
mod service;
mod error;
mod schema;

pub struct AppState {
    pub db: Arc<DbPool>,
    pub conf: Arc<AppConfig>,
}

#[tokio::main(flavor = "current_thread")]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    tracing_subscriber::fmt().with_env_filter("debug").init();

    // io.ns("/", |s: SocketRef| {
    //     // For each "message" event received, send a "message-back" event with the "Hello World!" event
    //     s.on("message", |s: SocketRef| {
    //         println!("Received message");
    //         s.emit("message-back", "Hello World!").ok();
    //     });
    // });

    let config = AppConfig::new();

    let db_pool = CreateConnectionPool::new(&config);

    let shared_state = Arc::new(AppState {
        conf: Arc::new(config),
        db: Arc::new(db_pool.connection_pool.clone()),
    });

    let socket_layer_entrypoint = socket_entry_point(
        shared_state.clone(),
    );

    tokio::spawn(price_update_queue(shared_state.clone(), socket_layer_entrypoint.price_handler));

    let router = create_router(shared_state.clone())
    .layer(socket_layer_entrypoint.layer);

    let addr: SocketAddr = format!(
        "{}:{}",
        shared_state.conf.API_HOST, shared_state.conf.API_PORT,
    )
    .parse()
    .expect("Invalid address format");
    info!("Starting server on http://{}", addr);

    Server::bind(addr).serve(router.into_make_service()).await?;

    Ok(())
}
