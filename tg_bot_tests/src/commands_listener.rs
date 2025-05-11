use std::sync::{Arc, Mutex};

use teloxide::{Bot, prelude::Requester, types::Message};

use crate::{instructions::start_instruction::start_instruction, state::BotState};

pub async fn commands_listener(bot: Bot, message: Message, bot_state: Arc<Mutex<BotState>>) {
    let text = message.text().unwrap_or_default();

    match text {
        "/start" => {
            start_instruction(bot, message, bot_state.clone()).await;
            let mut state = bot_state.lock().unwrap();
            state.process_instruction.clear(); // Мутабельно изменяем
        },
        "/help" => {
            bot.send_message(message.chat.id, "Help message");
        }
        _ => {
            bot.send_message(message.chat.id, "Unknown command")
                .await
                .unwrap();
        }
    }
}
