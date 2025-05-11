use diesel::prelude::*;
use diesel::{
    PgConnection,
    r2d2::{ConnectionManager, PooledConnection},
};

use super::model::schemas::ProfileResponse;

type PooledPg = PooledConnection<ConnectionManager<PgConnection>>;

pub fn get_user_by_telegram_id(
    telegram_id_value: String,
    connection: &mut PgConnection,
) -> Option<ProfileResponse> {
    use crate::schema::profile::dsl::*;

    profile
        .filter(telegram_id.eq(telegram_id_value))
        .select(ProfileResponse::as_select())
        .first::<ProfileResponse>(connection)
        .optional()
        .expect("Error loading user by Telegram ID")
}
