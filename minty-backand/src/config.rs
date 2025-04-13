use dotenv::dotenv;
use std::env;

pub struct AppConfig {
    pub API_HOST: String,
    pub API_PORT: String,
    pub PG_HOST: String,
    pub PG_PORT: u16,
    pub PG_USER: String,
    pub PG_PASSWORD: String,
    pub PG_DBNAME: String,
    pub PG_POOL_MAX_SIZE: String
}

impl AppConfig {
    pub fn new() -> Self {
        dotenv().ok();

        // let      let api_host = env::var("API_HOST")
        // .expect("API_HOST must be set in .env");
    
        // Self { 
        //     API_HOST: env::var("API_HOST")
        //     .expect("API_HOST must be set in .env"),
        //     PG_HOST: env::var("API_HOST")
        //     .expect("API_HOST must be set in .env"),
        // }
        Self {
            API_HOST: env::var("API_HOST").expect("Variable API_HOST was doesn't provided"),
            API_PORT: env::var("API_PORT").expect("Variable API_PORT was doesn't provided"),
            PG_HOST: env::var("PG_HOST").expect("Variable PG_HOST was doesn't provided"),
            PG_PORT: env::var("PG_PORT")
            .expect("Variable PG_PORT was not provided")
            .parse()
            .expect("PG_PORT must be a valid u16 number"),
            PG_USER: env::var("PG_USER").expect("Variable PG_USER was doesn't provided"),
            PG_PASSWORD: env::var("PG_PASSWORD").expect("Variable PG_PASSWORD was doesn't provided"),
            PG_DBNAME: env::var("PG_DBNAME").expect("Variable PG_DBNAME was doesn't provided"),
            PG_POOL_MAX_SIZE: env::var("PG_POOL_MAX_SIZE").expect("Variable PG_POOL_MAX_SIZE was doesn't provided"),        }
    }
}