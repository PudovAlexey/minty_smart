use teloxide::types::BotCommand;

pub fn generate_menu_buttons() -> Vec<BotCommand> {
    vec![
        BotCommand::new("start", "Start bot"),
        BotCommand::new("register", "Register 🎲"),
        BotCommand::new("help", "Help"),
    ]
}