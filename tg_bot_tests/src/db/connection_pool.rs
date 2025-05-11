use diesel::PgConnection;
use diesel::r2d2::{ConnectionManager, Pool};


pub type DbPool = Pool<ConnectionManager<PgConnection>>;

pub struct CreateConnectionPool {
   pub connection_pool: DbPool
}

impl CreateConnectionPool {
    pub fn new(db_url: String) -> Self {

        let manager = ConnectionManager::<PgConnection>::new(db_url);

        let pool = Pool::builder()
        .max_size(20 as u32)
        .build(manager)
        .unwrap();
    
        Self {
            connection_pool: pool,
        }
    }
}