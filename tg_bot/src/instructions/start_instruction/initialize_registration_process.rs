use std::sync::Arc;

use teloxide::{dispatching::dialogue::GetChatId, prelude::Requester, types::{CallbackQuery, Message}, Bot};

use crate::bot_state::BotState;

use super::ProcessStartInstruction;

pub async fn initialize_registration_process(
    bot_state: Arc<BotState>,
    bot: Bot,
    cb: CallbackQuery

) -> ProcessStartInstruction {
    
    bot.send_message(cb.chat_id().unwrap(), "please enter your email address to start registration process").await;

    ProcessStartInstruction::CheckEmaillProcess { email: String::from("") }
}