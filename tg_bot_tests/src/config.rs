use dotenv::dotenv;
use std::env;

pub struct AppConfig {
    pub DATABASE_URL: String
}

impl AppConfig {
    pub fn new() -> Self {
        dotenv().ok();

        Self { 
            DATABASE_URL: env::var("DATABASE_URL").expect("Variable TOKEN_LIST_REQUEST_URL was doesn't provided"),
        }
    }
}