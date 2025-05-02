use diesel::prelude::*;
use diesel::{r2d2::{ConnectionManager, PooledConnection}, PgConnection};

use super::model::create_peer_to_peer::{CreatePeerToPeerBody, CreatePeerToPeerResponce, CreatePeerToPeerSchema};

type PooledPg = PooledConnection<ConnectionManager<PgConnection>>;

pub async fn create_peer_to_peer(
    body: CreatePeerToPeerBody,
    connection: &mut PooledPg,
) -> CreatePeerToPeerResponce {
    let to_schema = CreatePeerToPeerSchema::from(body);

   diesel::insert_into(crate::schema::merchant_order::table)
    .values(to_schema)
    .returning(crate::schema::merchant_order::id)
    .get_result(connection)
    .unwrap()
}