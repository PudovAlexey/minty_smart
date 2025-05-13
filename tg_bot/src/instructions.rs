use std::sync::Arc;

use start_instruction::{
    initialize_registration_process::initialize_registration_process, initialize_start::initialize_start, process_check_email::process_check_email, ProcessStartInstruction
};
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
    pub async fn process_listen_message_instruction(
        &mut self,
        bot: Bot,
        message: Message,
        bot_state: Arc<BotState>,
    ) {
        println!("IN MESSAGE {:?}", self.bot_instruction);
        let messages = message.text().unwrap();


        match messages {
            "/start" => {
                self.bot_instruction =
                    EntryPoint::ProcessStart(initialize_start(bot_state, bot, message).await);
            }
            _ => {
                match &mut self.bot_instruction {
                    EntryPoint::ProcessStart(ProcessStartInstruction::AlreadyRegistered) => {
                        let new_state = initialize_start(bot_state, bot, message).await;
                        self.bot_instruction = EntryPoint::ProcessStart(new_state);
                    }
                    EntryPoint::ProcessStart(
                        ProcessStartInstruction::CheckEmaillProcess { email },
                    ) => {
                        process_check_email(bot_state, bot, message).await;
                        // let email_clone = email.clone(); // Клонируем email если нужно
                        // let new_state = initialize_start(bot_state, bot, message).await;
                        // self.bot_instruction = EntryPoint::ProcessStart(new_state);
                    }
                    _ => {
                        let _ = bot.send_message(message.chat.id, "unknown command").await;
                    }
                }
            }
        }
    }

    pub async fn process_listen_callback_instruction(
        &mut self,
        bot: Bot,
        cb: CallbackQuery,
        bot_state: Arc<BotState>,

    ) {
        println!("CALLBACK {:?}", self.bot_instruction);

        match self.bot_instruction {
            EntryPoint::ProcessStart(ProcessStartInstruction::InirializeRegistrationProcess) => {
                self.bot_instruction = EntryPoint::ProcessStart(initialize_registration_process(
                    bot_state,
                    bot,
                    cb
                ).await);
            },
            _ => {
                // Обработка других случаев
            }
        }
    }
}
