use dotenv::dotenv;
use std::env;

pub struct AppConfig {
    pub DATABASE_URL: String,
    pub REDIS_PORT: String,

    pub SMTP_TRANSPORT: String,
    pub SMTP_USERNAME: String,
    pub SMTP_PASSWORD: String,
}

impl AppConfig {
    pub fn new() -> Self {
        dotenv().ok();

        Self {
            DATABASE_URL: env::var("DATABASE_URL")
                .expect("Variable DATABASE_URL was doesn't provided"),
            REDIS_PORT: env::var("REDIS_PORT").expect("Variable REDIS_PORT was doesn't provided"),

            SMTP_TRANSPORT: env::var("SMTP_TRANSPORT")
                .expect("Variable SMTP_TRANSPORT was doesn't provided"),
            SMTP_USERNAME: env::var("SMTP_USERNAME")
                .expect("Variable SMTP_USERNAME was doesn't provided"),
            SMTP_PASSWORD: env::var("SMTP_PASSWORD")
                .expect("Variable SMTP_PASSWORD was doesn't provided"),
        }
    }
}
