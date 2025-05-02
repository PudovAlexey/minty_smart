use std::sync::Arc;

use teloxide::{Bot, prelude::Requester, types::Message};
use tracing::info;

use crate::{
    instructions::{
        register_instruction::register_instruction,
        register_request_email::{self, register_request_email},
        register_request_email_code::{self, register_request_email_code},
        start_instruction::start_instruction,
    },
    menu::generate_menu_buttons,
};
pub struct EntrypointBuilder {
    pub stage: EntryPointTree,
}

#[derive(Clone, Debug)]
pub enum Entrypoint {
    Start,

    RegisterRequestEmail,
    RequestEmailCode,

    Help,

    UnnounCommand,
}

#[derive(Clone, Debug)]
pub struct EntryPointTree {
    pub node: Option<Entrypoint>,
    pub children: Vec<EntryPointTree>,
}

impl EntryPointTree {
    pub fn new() -> Self {
        Self {
            node: None,
            children: vec![],
        }
    }

    pub fn generate_register_tree() -> Self {
        let mut register_tree = EntryPointTree {
            node: Some(Entrypoint::RegisterRequestEmail),
            children: vec![EntryPointTree {
                node: Some(Entrypoint::RequestEmailCode),
                children: vec![],
            }],
        };

        register_tree
    }
}

impl EntrypointBuilder {
    pub async fn new() -> Self {
        let initialized_bot_tree = EntryPointTree::new();
        Self {
            stage: initialized_bot_tree,
        }
    }

    pub async fn listen_instruction(&mut self, bot: Bot, msg: Message) {
        let processed_menu_commands = self
            .listen_menu_button_commands(bot.clone(), msg.clone())
            .await;

        if (processed_menu_commands.is_some()) {
            return;
        }

        println!("{:?}", &self.stage.node);

        if let Some(stage) = &self.stage.node {
            match stage {
                Entrypoint::RegisterRequestEmail => {
                    match register_request_email(bot, msg).await {
                        Ok(_) => {
                            self.stage = self.stage.children[0].clone();
                        }
                        Err(_) => {}
                    };
                }
                Entrypoint::RequestEmailCode => {
                    register_request_email_code(bot, msg).await;
                    self.stage = EntryPointTree::new();
                },
                _ => {}
            }
        } else {
        }
    }

    pub async fn listen_menu_button_commands(&mut self, bot: Bot, msg: Message) -> Option<()> {
        bot.set_my_commands(generate_menu_buttons())
            .await
            .expect("Failed to set bot commands");

        let text = msg.text().unwrap_or_default();

        match text {
            "/start" => {
                start_instruction(bot, msg).await;
                self.stage = EntryPointTree::new();
                Some(())
            }
            "/register" => {
                register_instruction(bot, msg).await;
                self.stage = EntryPointTree::generate_register_tree();
                Some(())
            }
            _ => None,
        }
    }
}
