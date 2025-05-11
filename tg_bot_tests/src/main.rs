mod menu;
mod entrypoint;
mod state;
mod config;
mod instructions;
mod messages;
mod commands_listener;
mod db;
use std::sync::{Arc, Mutex};

use config::AppConfig;
use db::connection_pool::CreateConnectionPool;
use entrypoint::EntrypointBuilder;
use state::BotState;
mod schema;
use tracing::info;
use commands_listener::commands_listener;
use teloxide::prelude::*;

#[tokio::main]
async fn main() {
    dotenv::dotenv().expect("Failed to read .env file");
    info!("Starting throw dice bot...");
    let  app_config = AppConfig::new();

    let connection_pool = CreateConnectionPool::new(app_config.DATABASE_URL);

    let bot_state = Arc::new(Mutex::new(
        BotState {
            db: Arc::new(connection_pool.connection_pool.clone()),
            process_instruction: Vec::new(),
        }
    ));

    let bot = Bot::from_env();
    let bot_state = bot_state.clone();
    // let entrypoint_builder = Arc::new(tokio::sync::Mutex::new(EntrypointBuilder::new(
    //     bot_state
    // ).await)); // Use tokio::sync::Mutex
    
    let handler = dptree::entry()
        .branch(Update::filter_message().endpoint(
            move |bot: Bot, msg: Message| {
                let bot_state = bot_state.clone();
                // let entrypoint_builder = entrypoint_builder.clone();
                async move {
                    println!("{}", msg.text().unwrap_or_default());
                    commands_listener(
                        bot,
                        msg,
                        bot_state
                    ).await;
                    // let mut builder = entrypoint_builder.lock().await;
                    // builder.listen_instruction(bot.clone(), msg.clone()).await;
                    Ok::<(), teloxide::RequestError>(()) 
                }
            },
        ))
        .branch(Update::filter_callback_query().endpoint(
            move |bot: Bot, q: CallbackQuery| {

                async move {
                    if let Some(data) = q.data {
                        println!("Callback received: {}", data);
                    }
                    Ok::<(), teloxide::RequestError>(()) 
                }
            },
        ));

    Dispatcher::builder(bot, handler)
        .enable_ctrlc_handler()
        .build()
        .dispatch()
        .await;
}