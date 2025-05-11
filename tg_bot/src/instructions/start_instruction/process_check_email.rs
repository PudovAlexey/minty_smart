use std::sync::Arc;

use regex::Regex;
use teloxide::{types::Message, Bot};

use crate::bot_state::BotState;

use super::ProcessStartInstruction;

pub async fn process_check_email(
    bot_state: Arc<BotState>,
    bot: Bot,
    msg: Message,
) -> ProcessStartInstruction {
    let email_regex = Regex::new(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$").unwrap();

    if email_regex.is_match(&msg.text().unwrap()) {
        // TODO: check if email is valid
    } else {
        // TODO: send message to user
    }
    todo!()
}