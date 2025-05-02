use teloxide::{Bot, prelude::Requester, types::Message};

pub async fn register_request_email_code(bot: Bot, message: Message) {
    bot.send_message(message.chat.id, "you are registered successfully")
        .await;
}
