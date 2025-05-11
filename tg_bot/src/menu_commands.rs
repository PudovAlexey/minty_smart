use teloxide::types::BotCommand;

pub fn menu_commands() -> Vec<BotCommand> {
    vec![
        BotCommand::new("start", "Start bot"),
    ]
}