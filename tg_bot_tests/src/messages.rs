pub enum Messages {
    Greeting,

}

impl Into<String> for Messages {
    fn into(self) -> String {

        match self {
            Messages::Greeting => {
                let welcome_text = r#"
                🚀 *Welcome to DEFY!* 🚀  
            
                *You’ve entered the zone where DeFi and anonymity fuck hard.*  
                *Where txns are lightning-fast, and rug pulls don’t exist.*  
            
                📌 *What’s in it for you?*  
                ▪️ **Mint** – claim your cut before the normies wake up  
                ▪️ **Bridge** – move assets like a ghost across chains  
                ▪️ **Stack** – earn while weak hands panic-sell  
            
                *Ready to play?*  
                *Hit /start and LFG.*  
            
                *P.S. You’re here for a reason.* 🔥  
                "#.to_string();
            
                welcome_text
            },
        }
    }
}