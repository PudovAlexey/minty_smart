use diesel::{r2d2::{ConnectionManager, PooledConnection}, sql_query, PgConnection, RunQueryDsl};

use super::model::get_peer_to_peer_list::{GetPeerToPeerListArgs, GetPeerToPeerListResponse};

type PooledPg = PooledConnection<ConnectionManager<PgConnection>>;

pub fn get_peer_to_peer_list(
    args: GetPeerToPeerListArgs, 
    connection: &mut PooledPg,
) -> Vec<GetPeerToPeerListResponse> {
    let GetPeerToPeerListArgs {
        page,
        page_size,
        search_value,
        operation_type,
        ..
    } = args;

    let page = page.unwrap_or(1);
    let page_size = page_size.unwrap_or(100);
    let limit = page_size as i32;
    let offset = ((page - 1) * page_size) as i32;

    let string_operation_type: String = operation_type.into();
    let search_string = match search_value {
     Some(val) => val,
     None => String::new()   
    };

    let search_pattern = format!("%{}%", search_string);

    let query = "
SELECT 
    merchant_order.id AS id,
    merchant.merchant_name AS merchant_name,
    image.image_url AS merchant_avatar,
    merchant.rating AS merchant_rating,
    merchant.successful_transactions AS merchant_success_transactions,
    merchant_order.asset_amount AS asset_amount,
    merchant_order.asset_limit_from AS asset_limit_from,
    merchant_order.asset_limit_to AS asset_limit_to,
    merchant_order.asset_type AS operation_type
FROM merchant_order
LEFT JOIN merchant
    ON merchant_order.merchant_id = merchant.id
LEFT JOIN image
    ON image.id = merchant.image_id
WHERE 
    merchant_order.asset_type = $3 AND
    (
        merchant.merchant_name ILIKE $4 OR
        merchant_order.asset_amount::TEXT ILIKE $4 OR
        merchant_order.asset_limit_from::TEXT ILIKE $4 OR
        merchant_order.asset_limit_to::TEXT ILIKE $4
    )
LIMIT $1
OFFSET $2;
    ";

    let query_result = sql_query(query)
        .bind::<diesel::sql_types::Integer, _>(limit)
        .bind::<diesel::sql_types::Integer, _>(offset)
        .bind::<diesel::sql_types::Text, _>(string_operation_type)
        .bind::<diesel::sql_types::Text, _>(search_pattern)
        .load::<GetPeerToPeerListResponse>(connection)
        .expect("Database error");

    query_result
}
