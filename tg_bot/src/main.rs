mod menu;
mod entrypoint;
mod instructions;
mod messages;
use entrypoint::Entrypoint;
use menu::generate_menu_buttons;
use tracing::info;
use teloxide::{dispatching::dialogue::GetChatId, prelude::*, types::{BotCommand, InlineKeyboardButton, InlineKeyboardMarkup, ReplyMarkup}};

#[tokio::main]
async fn main() {
    // Загружаем .env файл
    dotenv::dotenv().expect("Failed to read .env file");
    info!("Starting throw dice bot...");

    let bot = Bot::from_env();
    
    teloxide::repl(bot, |bot: Bot, msg: Message| async move {
        println!("{}", msg.text().unwrap());
        bot.set_my_commands(generate_menu_buttons()).await.expect("Failed to set bot commands");

        Entrypoint::to_command(bot, msg).await;
        Ok(())
    })
    .await;
}