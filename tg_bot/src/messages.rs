pub enum Messages {
    Greeting,

}

impl Into<String> for Messages {
    fn into(self) -> String {

        match self {
            Messages::Greeting => {
                let welcome_text = r#"
                ✨ *Welcome to Minty!* ✨
                
                To get started, you need to register on our platform. 
                Shall we begin?
                    "#;

                welcome_text.to_string()
            },
        }
    }
}