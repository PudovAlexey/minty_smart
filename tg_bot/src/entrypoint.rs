use teloxide::{types::Message, Bot};
use tracing::info;

use crate::instructions::start_instruction::start_instruction;

pub enum Entrypoint {
    Start,
    Register,
    Help,
    UnnounCommand
}

impl Entrypoint {
    pub async fn to_command(bot: Bot, msg: Message) -> Self {
        let message = msg.text().unwrap_or_default();

        info!("Message received: {}", message);

        match message {
            "/start" => {
                start_instruction(bot, msg).await;
                Entrypoint::Start
            },
            "/register" => Entrypoint::Register,
            "/help" => Entrypoint::Help,
            _ => Entrypoint::UnnounCommand,
        }
    }
}