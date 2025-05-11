use std::sync::Arc;

use crate::{db::connection_pool::DbPool, instructions::EntryPointProcessor};

pub struct BotState {
    pub db: Arc<DbPool>,
}
