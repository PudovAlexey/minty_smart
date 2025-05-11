use std::sync::Arc;

use crate::db::connection_pool::DbPool;

pub struct BotState {
  pub db: Arc<DbPool>,
  pub process_instruction: Vec<Entrypoint>
}

#[derive(Clone, Debug)]
pub enum Entrypoint {
    Start,

    BotLoading,

    // if user don't have account
    RegistrationStarted,

    
    // if user have account
    UserAlreadyRegistered,

    RegistrationRequestEmail{email: String},

    // if user sended invalid email
    InvalidEmail,

    Help,

    UnnounCommand,

    BotError
}