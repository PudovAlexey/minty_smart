use regex::Regex;
use teloxide::{Bot, prelude::Requester, types::Message};

pub async fn register_request_email(bot: Bot, msg: Message) -> Result<(), ()> {
    let text = msg.text().unwrap_or("").to_string();

    let email_regex = Regex::new(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$").unwrap();

    if email_regex.is_match(&text) {
        bot.send_message(msg.chat.id, format!("На ваш email {} было отправлен проверочный код. введите его для подтверждения регистрации", text))
            .await;
        Ok(())
    } else {
        bot.send_message(msg.chat.id, "Это не похоже на валидный email. Пожалуйста, введите email в формате example@domain.com")
           .await;

        Err(())
    }
}
