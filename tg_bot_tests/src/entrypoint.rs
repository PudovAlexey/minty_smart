use dptree::case;
use std::sync::Arc;

use teloxide::{
    Bot,
    dispatching::{UpdateFilterExt, dialogue::GetChatId},
    payloads::{AnswerCallbackQuery, AnswerCallbackQuerySetters, SendMessageSetters},
    prelude::{Dispatcher, Requester, ResponseResult},
    types::{
        CallbackQuery, InlineKeyboardButton, InlineKeyboardMarkup, Message, Update, WebAppInfo,
    },
};
use tracing::info;
use url::Url;

use crate::{
    instructions::{
        register_instruction::register_instruction, register_request_email::register_request_email,
        start_instruction::start_instruction,
    },
    menu::generate_menu_buttons,
    state::{BotState, Entrypoint},
};

#[derive(Clone)]
pub struct EntrypointBuilder {
    pub entrypoint_history: Vec<Entrypoint>,
    pub bot_state: Arc<BotState>,
}

// impl EntrypointBuilder {
//     pub async fn new(bot_state: Arc<BotState>) -> Self {
//         Self {
//             entrypoint_history: Vec::new(),
//             bot_state,
//         }
//     }

//     pub async fn listen_instruction(&mut self, bot: Bot, msg: Message) {
//         let processed_menu_commands = self
//             .listen_menu_button_commands(bot.clone(), msg.clone())
//             .await;

//         if processed_menu_commands.is_some() {
//             return;
//         }

//         let last_bot_step = self.clone().check_for_last_bot_step();

//         info!("last_bot_step: {:?}", last_bot_step);

//         if let Some(last_bot_step) = last_bot_step {
//             match last_bot_step {
//                 Entrypoint::RegistrationStarted => {
//                     if let Entrypoint::RegistrationRequestEmail { email } =
//                         register_request_email(bot.clone(), msg.clone(), self.bot_state.clone())
//                             .await
//                     {
//                         self.clear_history();
//                     }
//                 }
//                 _ => {
//                     bot.send_message(msg.chat.id, "Bot logic error").await;
//                 }
//             }
//         } else {
//             bot.send_message(msg.chat.id, "Unknown command").await;
//         }
//     }

//     pub async fn listen_menu_button_commands(&mut self, bot: Bot, msg: Message) -> Option<()> {
//         bot.set_my_commands(generate_menu_buttons())
//             .await
//             .expect("Failed to set bot commands");

//         let text = msg.text().unwrap_or_default();

//         match text {
//             "/start" => {
//                 start_instruction(bot, msg).await;
//                 self.entrypoint_history = Vec::new();
//                 Some(())
//             }
//             "/register" => {
//                 let register_result = register_instruction(bot, msg, self.bot_state.clone()).await;

//                 self.entrypoint_history.push(register_result);
//                 Some(())
//             }
//             "/open_app" => {
//                 let webapp_info = WebAppInfo {
//                     url: Url::parse("https://improperly-easy-griffon.cloudpub.ru:443")
//                         .expect("Invalid WebApp URL"),
//                 };

//                 let keyboard =
//                     InlineKeyboardMarkup::new(vec![vec![InlineKeyboardButton::web_app(
//                         "Open Mini App",
//                         webapp_info,
//                     )]]);

//                 bot.send_message(msg.chat.id, "Click the button to open the Mini App")
//                     .reply_markup(keyboard)
//                     .await;

//                 Some(())
//             }
//             "/help" => {
//                 bot.send_message(msg.chat.id, "Help message");
//                 Some(())
//             }
//             _ => None,
//         }
//     }

//     pub fn check_for_last_bot_step(self) -> Option<Entrypoint> {
//         self.entrypoint_history.last().cloned()
//     }

//     pub fn clear_history(&mut self) {
//         self.entrypoint_history.clear();
//     }
// }

// async fn handle_start_pressed(bot: Bot, q: CallbackQuery) -> ResponseResult<()> {
//     println!("Кнопка start_pressed нажата!");

//     if let Some(chat_id) = q.chat_id() {
//         bot.send_message(chat_id, "Вы нажали кнопку старт!").await?;
//     }

//     bot.answer_callback_query(q.id).await?;
//     Ok(())
// }
