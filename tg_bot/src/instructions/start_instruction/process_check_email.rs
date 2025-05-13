use std::sync::Arc;

use crate::mailer::smtp_client::Mailer;
use lettre::message::header::ContentType;
use regex::Regex;
use teloxide::{Bot, prelude::Requester, types::Message};

use crate::bot_state::BotState;

use super::ProcessStartInstruction;

pub async fn process_check_email(
    bot_state: Arc<BotState>,
    bot: Bot,
    msg: Message,
) -> ProcessStartInstruction {
    let email = msg.text().unwrap();
    let email_regex = Regex::new(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$").unwrap();

    if email_regex.is_match(email) {
        let redis_client = bot_state.mailer_client.clone();

        redis_client.send_message(Mailer {
            to: email.to_string(),
            subject: String::from(""),
            header: ContentType::TEXT_HTML,
            body: String::from(""),
        });

        bot.send_message(msg.chat.id, format!("On your email: {}", email.to_string()));
        // TODO: check if email is valid
    } else {
        // TODO: send message to user
    }
    todo!()
}
