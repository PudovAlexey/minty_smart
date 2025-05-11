mod bot_state;
mod config;
mod db;
mod schema;
mod instructions;
mod menu_commands;
mod messages;
use std::sync::Arc;

use bot_state::BotState;
use config::AppConfig;
use db::connection_pool::CreateConnectionPool;
use instructions::EntryPointProcessor;
use teloxide::{
    Bot,
    dispatching::UpdateFilterExt,
    prelude::Dispatcher,
    types::{CallbackQuery, Message, Update},
};
use tracing::info;

#[tokio::main]
async fn main() {
    dotenv::dotenv().expect("Failed to read .env file");
    info!("Starting throw dice bot...");
    let app_config = AppConfig::new();

    let connection_pool = CreateConnectionPool::new(app_config.DATABASE_URL);

    let bot_state = Arc::new(BotState {
        db: Arc::new(connection_pool.connection_pool.clone()),
    });

    let entrypoint_processor = Arc::new(tokio::sync::Mutex::new(EntryPointProcessor::new()));

    let bot = Bot::from_env();
    let bot_state = bot_state.clone();

    let handler = dptree::entry()
        .branch(Update::filter_message().endpoint({
            let processor = entrypoint_processor.clone();
            let bot_state = bot_state.clone();
            move |bot: Bot, msg: Message| {
                let processor = processor.clone();
                let bot_state = bot_state.clone();
                async move {
                    println!("Message: {}", msg.text().unwrap_or_default());
                    let mut processor = processor.lock().await;
                    processor.process_listen_message_instruction(bot, msg, bot_state).await;
                    Ok::<(), teloxide::RequestError>(())
                }
            }
        }))
        .branch(Update::filter_callback_query().endpoint({
            let processor = entrypoint_processor.clone();
            move |bot: Bot, q: CallbackQuery| {
                let bot_state = bot_state.clone();
                let processor = processor.clone();
                async move {
                    let bot_state = bot_state.clone();
                    let mut processor = processor.lock().await;
                    processor.process_listen_callback_instruction(bot, q, bot_state).await;
                    Ok::<(), teloxide::RequestError>(())
                }
            }
        }));

    Dispatcher::builder(bot, handler)
        .enable_ctrlc_handler()
        .build()
        .dispatch()
        .await;
}
