use diesel::{pg::sql_types, r2d2::{ConnectionManager, PooledConnection}, sql_query, Connection, PgConnection, RunQueryDsl};

use crate::db::peer_to_peer::model::create_merchant_active_order::CreateMerchantActiveOrderSchema;

use super::model::{create_merchant_active_order::{CreateMerchantActiveOrderBody, CreateMerchantActiveOrderTransactionResult}, create_peer_to_peer::CreatePeerToPeerBody};

type PooledPg = PooledConnection<ConnectionManager<PgConnection>>;


pub async fn create_merchant_active_order(
    body: CreateMerchantActiveOrderBody,
    connection: &mut PooledPg,
) -> Result<uuid::Uuid, diesel::result::Error> {
    // Деструктурируем body, не заимствуя
    let CreateMerchantActiveOrderBody {
        order_amount,
        order_id,
        ..
    } = &body;

    // Создаем схему ДО транзакции
    let create_active_order_schema = CreateMerchantActiveOrderSchema::from(&body);

   let transaction_result =  connection.transaction::<uuid::Uuid, diesel::result::Error, _>(|tx| {
        // Обновляем баланс
        diesel::sql_query(
            "UPDATE merchant_order
            SET asset_amount = asset_amount - $1
            WHERE id = $2
            AND asset_amount >= $1
            AND $1 BETWEEN asset_limit_from AND asset_limit_to
            RETURNING id"
        )
        .bind::<diesel::sql_types::Numeric, _>(&order_amount)
        .bind::<diesel::sql_types::Uuid, _>(&order_id)
        .execute(tx)?;

        // Вставляем новый активный ордер
        let result: CreateMerchantActiveOrderTransactionResult = diesel::insert_into(crate::schema::merchant_active_order::table)
        .values(create_active_order_schema)
        .returning(crate::schema::merchant_active_order::id)
        .get_result(tx)?;

        // Возвращаем ID нового ордера
        Ok(result.id)
    });

    transaction_result
}