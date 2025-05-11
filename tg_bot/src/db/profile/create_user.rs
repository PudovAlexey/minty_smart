use diesel::{r2d2::{ConnectionManager, PooledConnection}, PgConnection, RunQueryDsl};

use super::model::create_user::{CreateUserBody, CreateUserBodyResult};

type PooledPg = PooledConnection<ConnectionManager<PgConnection>>;

pub fn create_user_handler(
    user: CreateUserBody,
    connection: &mut PooledPg,
) -> CreateUserBodyResult {
    
   let result: CreateUserBodyResult = diesel::insert_into(crate::schema::profile::table)
    .values(user)
    .returning(crate::schema::profile::id)
    .get_result(connection)
    .unwrap();

    result
}