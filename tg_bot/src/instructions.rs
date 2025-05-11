use std::sync::Arc;

use start_instruction::{initialize_start::initialize_start, ProcessStartInstruction};
use teloxide::{
    Bot,
    prelude::Requester,
    types::{CallbackQuery, Message},
};

use crate::bot_state::BotState;

pub mod start_instruction;

#[derive(Debug, Clone)]
pub enum EntryPoint {
    ProcessStart(ProcessStartInstruction),
    Empty,
}

#[derive(Clone)]
pub struct EntryPointProcessor {
    bot_instruction: EntryPoint,
}

impl EntryPointProcessor {
    pub fn new() -> Self {
        Self {
            bot_instruction: EntryPoint::Empty,
        }
    }
    pub async fn process_listen_message_instruction(&mut self, bot: Bot, message: Message, bot_state: Arc<BotState>) {
        let messages = message.text().unwrap();

        match messages {
            "/start" => {
                self.bot_instruction = EntryPoint::ProcessStart(initialize_start(
                    bot_state,
                    bot,
                    message,
                ).await);
            }
            _ => {
                match &mut self.bot_instruction {
                    EntryPoint::ProcessStart(ProcessStartInstruction::AlreadyRegistered) => {
                        let new_state = initialize_start(bot_state, bot, message).await;
                        self.bot_instruction = EntryPoint::ProcessStart(new_state);
                    },
                    EntryPoint::ProcessStart(ProcessStartInstruction::StartRegistrationProcess { email }) => {
                        // let email_clone = email.clone(); // Клонируем email если нужно
                        // let new_state = initialize_start(bot_state, bot, message).await;
                        // self.bot_instruction = EntryPoint::ProcessStart(new_state);
                    },
                    _ => {
                        let _ = bot.send_message(message.chat.id, "unknown command").await;
                    }
                }
            }
        }
    }

    pub async fn process_listen_callback_instruction(&mut self, bot: Bot, cb: CallbackQuery, bot_state: Arc<BotState>) {
        match self.bot_instruction {
            EntryPoint::ProcessStart(ProcessStartInstruction::AlreadyRegistered) => {
                // bot.send_message(message.chat.id, "Hi developer second message")
                // .await;
            }
            _ => {
                // Обработка других случаев
            }
        }
    }
}
