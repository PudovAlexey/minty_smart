use diesel::prelude::*;
use diesel::{r2d2::{ConnectionManager, PooledConnection}, PgConnection};

use super::model::create_peer_to_peer::{CreatePeerToPeerBody, CreatePeerToPeerSchema};

type PooledPg = PooledConnection<ConnectionManager<PgConnection>>;

pub fn create_peer_to_peer(
    body: CreatePeerToPeerBody,
    connection: &mut PooledPg,
) {
    let to_schema = CreatePeerToPeerSchema::from(body);

    diesel::insert_into(crate::schema::merchant_order::table)
    .values(to_schema)
    .execute(connection)
    .unwrap();
}