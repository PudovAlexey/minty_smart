use redis::{Commands, Connection, RedisError, ToRedisArgs};

pub struct RedisClient {
    connection: Connection
}

impl RedisClient {
    pub fn new(
        redis_port: String,
    ) -> Result<Self, RedisError> {
        let client = redis::Client::open(redis_port)
        .map_err(|e| e)
        .unwrap();


        let connection = client.get_connection().unwrap();

    Ok(Self { connection: connection })
    }
}