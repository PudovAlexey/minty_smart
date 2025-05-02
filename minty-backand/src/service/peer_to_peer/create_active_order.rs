use diesel::{r2d2::{ConnectionManager, PooledConnection}, PgConnection};

use crate::{
    client::dto::peer_to_peer::create_active_order::{CreateMerchantActiveOrderBody, CreateMerchantActiveOrderResponce}, 
    db::peer_to_peer::create_merchant_active_order::create_merchant_active_order, schema::merchant_active_order::{escrow_address, order_amount}
};
use crate::db::peer_to_peer::model::create_merchant_active_order::CreateMerchantActiveOrderBody as ModelActiveOrderBody;
use crate::db::peer_to_peer::model::shared::OrderStatus;

type PooledPg = PooledConnection<ConnectionManager<PgConnection>>;

pub async fn create_active_order(
    body: CreateMerchantActiveOrderBody,
    connection: &mut PooledPg,
) -> CreateMerchantActiveOrderResponce {

    let body = ModelActiveOrderBody {
        escrow_address: body.escrow_address,
        order_amount: body.order_amount,
        order_status: OrderStatus::Opened,
        order_id: body.order_id,
        user_id: uuid::Uuid::new_v4(),
    };

    let result = create_merchant_active_order(
        body,
        connection,
    ).await.unwrap();

    CreateMerchantActiveOrderResponce {
        id: result
    }
}