use std::net::SocketAddr;
use tracing::info;

use std::sync::Arc;

use axum_server::Server;

use client::router::create_router;
use db::connection_pool::{CreateConnectionPool, DbPool};

use crate::config::AppConfig;

// use tracing::info;

mod client;
mod config;
mod db;
mod entities;
mod service;
mod error;

pub struct AppState {
    pub db: Arc<DbPool>,
    pub conf: Arc<AppConfig>,
}

#[tokio::main(flavor = "current_thread")]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    tracing_subscriber::fmt().with_env_filter("debug").init();
    let config = AppConfig::new();

    let db_pool = CreateConnectionPool::new(&config).unwrap();

    let shared_state = Arc::new(AppState {
        conf: Arc::new(config),
        db: Arc::new(db_pool.connection_pool.clone()),
    });

    let router = create_router(shared_state.clone());

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
