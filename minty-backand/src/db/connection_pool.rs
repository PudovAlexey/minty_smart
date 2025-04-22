use diesel::PgConnection;
use diesel::r2d2::{ConnectionManager, Pool};

use crate::config::AppConfig;


pub type DbPool = Pool<ConnectionManager<PgConnection>>;

pub struct CreateConnectionPool {
   pub connection_pool: DbPool
}

impl CreateConnectionPool {
    pub fn new(AppConfig {
        PG_HOST,
        PG_PORT,
        PG_USER,
        PG_PASSWORD,
        PG_DBNAME,
        PG_POOL_MAX_SIZE,
        ..
    }: &AppConfig) -> Self {
        let database_url = format!(
            "postgres://{}:{}@{}:{}/{}",
            PG_USER,
            PG_PASSWORD,
            PG_HOST,
            PG_PORT,
            PG_DBNAME
        );

        let manager = ConnectionManager::<PgConnection>::new(database_url);

        let pool = Pool::builder()
        .max_size(*PG_POOL_MAX_SIZE)
        .build(manager)
        .unwrap();
    
        Self {
            connection_pool: pool,
        }
    }
}