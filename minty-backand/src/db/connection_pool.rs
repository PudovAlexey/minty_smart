use deadpool_postgres::{Config, ManagerConfig, Pool, RecyclingMethod, Runtime};
use tokio_postgres::NoTls;

use crate::config::AppConfig;

pub type DbPool = Pool;

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
    }: &AppConfig) -> Result<Self, Box<dyn std::error::Error>> {

        let mut pool_cfg = Config::new();
        pool_cfg.host = Some(PG_HOST.to_string());
        pool_cfg.port = Some(*PG_PORT);
        pool_cfg.user = Some(PG_USER.to_string());
        pool_cfg.password = Some(PG_PASSWORD.to_string());
        pool_cfg.dbname = Some(PG_DBNAME.to_string());
        pool_cfg.manager = Some(ManagerConfig {
            recycling_method: RecyclingMethod::Fast,
        });
        // pool_cfg.max = max_pool_size;
    
       let connection_pool = pool_cfg.create_pool(Some(Runtime::Tokio1), NoTls)
            .map_err(|e| e.into());

        match connection_pool {
            Ok(pool) => Ok(Self {
                connection_pool: pool
            }),
            Err(e) => return Err(e)
        }
    }
}