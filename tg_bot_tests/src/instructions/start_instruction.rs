use std::sync::{Arc, Mutex};

use crate::{messages::Messages, state::BotState};
use teloxide::{
    Bot,
    payloads::{SendMessageSetters, SendPhotoSetters},
    prelude::Requester,
    types::{InlineKeyboardButton, InlineKeyboardMarkup, InputFile, Message, WebAppInfo},
};

pub async fn start_instruction(bot: Bot, message: Message, bot_state: Arc<Mutex<BotState>>) {
    let greeting_message: String = Messages::Greeting.into();

    let is_registered_user = false;

    let regiser_keyboad  = if is_registered_user {
        InlineKeyboardMarkup::new(vec![
            vec![InlineKeyboardButton::web_app(
                "OpenApp",
                WebAppInfo {
                    url: url::Url::parse("https://t.me/MyBot?start=webapp").unwrap(),
                },
            )],
        ])
    } else {
        InlineKeyboardMarkup::new(vec![
            vec![InlineKeyboardButton::callback(
                "OpenApp",
                "register_handler"
            )],
        ])
    };

    let photo = InputFile::url(
        url::Url::parse(
            "https://i.pinimg.com/originals/b4/6c/82/b46c82ef88cb5a40c5f5a4f83e18fa05.jpg",
        )
        .unwrap(),
    );

    bot.send_photo(message.chat.id, photo)
        .caption(greeting_message)
        .reply_markup(regiser_keyboad)
        .await;
}
