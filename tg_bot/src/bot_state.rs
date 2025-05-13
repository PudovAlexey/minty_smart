use std::sync::Arc;

use crate::{db::connection_pool::DbPool, instructions::EntryPointProcessor, mailer::smtp_client::MailerClient, redis::RedisClient};

pub struct BotState {
    pub db: Arc<DbPool>,
    pub mailer_client: Arc<MailerClient>,
    pub redis_client: Arc<RedisClient>
}
