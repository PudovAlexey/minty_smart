use std::sync::Arc;

use teloxide::{Bot, prelude::Requester, types::Message};

use crate::{
    db::profile::get_user_by_telegram_id::get_user_by_telegram_id,
    state::{BotState, Entrypoint},
};

pub async fn register_instruction(
    bot: Bot,
    message: Message,
    bot_state: Arc<BotState>,
) -> Entrypoint {
    let connection = &mut bot_state.db.get().expect("Failed connection to POOL");

    let user_telegram_id = message.from.unwrap().id.to_string();

    tracing::info!("Registering user with id: {}", user_telegram_id);

    let is_already_registered = get_user_by_telegram_id(user_telegram_id, connection);

    match is_already_registered {
        Some(_) => {
            bot.send_message(
                message.chat.id,
                "You are already registered. Just enjoy your traiding",
            )
            .await;

            Entrypoint::UserAlreadyRegistered
        }
        None => {
            bot.send_message(
                message.chat.id,
                "please send your email Just in case if you lost your telegram account",
            )
            .await;

            Entrypoint::RegistrationStarted
        }
    }
}
