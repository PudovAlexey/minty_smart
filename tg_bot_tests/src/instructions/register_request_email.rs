use std::sync::Arc;

use regex::Regex;
use teloxide::{
    Bot,
    prelude::Requester,
    types::{Message, User},
};

use crate::{
    db::profile::{create_user::create_user_handler, model::create_user::CreateUserBody},
    state::{BotState, Entrypoint},
};

pub async fn register_request_email(
    bot: Bot,
    msg: Message,
    bot_state: Arc<BotState>,
) -> Entrypoint {
    let text = msg.text().unwrap_or("").to_string();

    let email_regex = Regex::new(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$").unwrap();

    if email_regex.is_match(&text) {
        let User {
            id,
            first_name,
            last_name,
            ..
        } = msg.from.unwrap();

        let filled_last_name = match last_name {
            Some(last_name) => last_name,
            None => String::new(),
        };

        let connection = &mut bot_state.db.get().expect("Failed connection to POOL");

        create_user_handler(
            CreateUserBody {
                email: String::from(""),
                telegram_id: id.to_string(),
                name: format!("{} {}", first_name, filled_last_name).to_string(),
                // image_id: uuid::Uuid::new_v4(),
            },
            connection,
        );

        bot.send_message(
            msg.chat.id,
            format!(
                "Your account successfully registered with email: {}. Enjoy our application",
                text
            ),
        )
        .await;

        Entrypoint::RegistrationRequestEmail { email: text }
    } else {
        bot.send_message(msg.chat.id, "Your email is invalid. Please try again")
            .await;

        Entrypoint::InvalidEmail
    }
}
