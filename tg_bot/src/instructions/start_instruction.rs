use crate::messages::Messages;
use teloxide::{prelude::Requester, types::Message, Bot};

pub async fn start_instruction(
    bot: Bot,
    message: Message
) {
    let greeting_message: String = Messages::Greeting.into();

    bot.send_message(message.chat.id, greeting_message).await;
}