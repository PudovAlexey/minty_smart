use std::sync::Arc;

use teloxide::{
    Bot,
    payloads::SendMessageSetters,
    prelude::Requester,
    types::{InlineKeyboardButton, InlineKeyboardMarkup, Message, WebAppInfo},
};

use crate::{
    bot_state::BotState, db::profile::get_user_by_telegram_id::get_user_by_telegram_id,
    messages::MessageBuilder,
};

use super::ProcessStartInstruction;

pub async fn initialize_start(
    bot_state: Arc<BotState>,
    bot: Bot,
    msg: Message,
) -> ProcessStartInstruction {
    let connection = &mut bot_state.db.get().expect("Failed connection to POOL");

    let user_telegram_id = msg.from.unwrap().id.to_string();

    let is_already_registered = get_user_by_telegram_id(user_telegram_id, connection);

    
    match is_already_registered {
        Some(_) => {
            let message_keyboard =
                InlineKeyboardMarkup::new(vec![vec![InlineKeyboardButton::web_app(
                    "OpenApp",
                    WebAppInfo {
                        url: url::Url::parse("https://pudov-lending.vercel.app/").unwrap(),
                    },
                )]]);

            bot.send_message(msg.chat.id, MessageBuilder::StartMessageNotRegistered)
                .reply_markup(message_keyboard)
                .await;

            ProcessStartInstruction::AlreadyRegistered
        }
        None => {
            let message_keyboard =
                InlineKeyboardMarkup::new(vec![vec![InlineKeyboardButton::callback(
                    "Register", "register",
                )]]);

            bot.send_message(msg.chat.id, MessageBuilder::StartMessageNotRegistered)
                .reply_markup(message_keyboard)
                .await;

            ProcessStartInstruction::AlreadyRegistered
        }
    }
}
