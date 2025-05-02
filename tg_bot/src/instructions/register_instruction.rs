use teloxide::{prelude::Requester, types::Message, Bot};

use crate::entrypoint::{EntryPointTree, EntrypointBuilder};

// Запросить email

pub async fn register_instruction(
    bot: Bot,
    message: Message,
) {
    bot.send_message(message.chat.id, "please send your email").await;
}