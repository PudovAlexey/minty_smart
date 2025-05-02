mod menu;
mod entrypoint;
mod config;
mod instructions;
mod messages;
mod db;
use std::sync::{Arc, Mutex};

use config::AppConfig;
use db::connection_pool::CreateConnectionPool;
use entrypoint::{Entrypoint, EntrypointBuilder};
use menu::generate_menu_buttons;
use tracing::info;
use teloxide::{dispatching::dialogue::GetChatId, prelude::*, types::{BotCommand, InlineKeyboardButton, InlineKeyboardMarkup, ReplyMarkup}};

#[tokio::main]
async fn main() {
    dotenv::dotenv().expect("Failed to read .env file");
    info!("Starting throw dice bot...");
    let  app_config = AppConfig::new();

    let connection_pool = CreateConnectionPool::new(app_config.DATABASE_URL);

    let bot = Bot::from_env();
    let entrypoint_builder = Arc::new(tokio::sync::Mutex::new(EntrypointBuilder::new().await)); // Use tokio::sync::Mutex
    
    teloxide::repl(bot, move |bot: Bot, msg: Message| {
        let entrypoint_builder = entrypoint_builder.clone();
        
        async move {
            println!("{}", msg.text().unwrap());
            // bot.set_my_commands(generate_menu_buttons())
            //     .await
            //     .expect("Failed to set bot commands");

            // Use .lock().await for tokio::sync::Mutex
            let mut builder = entrypoint_builder.lock().await;
            builder.listen_instruction(bot.clone(), msg.clone()).await;

            Ok(())
        }
    })
    .await;
}