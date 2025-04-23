use diesel::associations::HasTable;
use diesel::{prelude::*, sql_query};

use diesel::{r2d2::{ConnectionManager, PooledConnection}, PgConnection};

use crate::client::dto::supplied_token::get_supplied_token_list_dto::GetSuppliedListParams;
use crate::db::model::supplied_token::{GetActiveTokens, GetMarketPairDatabaseResponse, GetUpdateTokenPairBody, MarketPair, MarketPairToPriceUpdate, SuppliedTokenSchema};

// use self::schema::supplied_token::dsl::*;

type PooledPg = PooledConnection<ConnectionManager<PgConnection>>;

pub async fn get_supplied_token_query_with_history(
    GetSuppliedListParams {
        page,
        search_value,
        page_size,
        ..
    }: GetSuppliedListParams,
    connection: &mut PooledPg,
) -> Vec<GetMarketPairDatabaseResponse> {
    let page = page.unwrap_or(1);
    let page_size = page_size.unwrap_or(100);
    let limit = page_size as i32;
    let offset = ((page - 1) * page_size) as i32;

    let query = "
WITH latest_prices AS (
    SELECT 
        pair_id,
        current_price,
        created_at,
        ROW_NUMBER() OVER (PARTITION BY pair_id ORDER BY created_at DESC) AS rn
    FROM 
        market_pair_history
),
filtered_tokens AS (
    SELECT 
        st.id,
        st.name,
        st.symbol,
        st.token_mint_address,
        st.image_id,
        lp.current_price
    FROM 
        supplied_token st
    LEFT JOIN 
        market_pair mp ON st.id = mp.token_a
    LEFT JOIN 
        latest_prices lp ON mp.id = lp.pair_id AND lp.rn = 1
    WHERE 
        st.symbol != 'USDC'
        AND ($3 IS NULL OR 
             st.name ILIKE '%' || $3 || '%' OR 
             st.symbol ILIKE '%' || $3 || '%')
)
SELECT 
    ft.id AS id,
    img.image_url AS image_url,
    ft.name AS name,
    ft.symbol AS symbol,
    ft.token_mint_address AS mint_address,
    ft.current_price AS latest_price,
    STRING_AGG(mph.current_price::text, ',' ORDER BY mph.created_at DESC) AS historical_prices
FROM 
    filtered_tokens ft
LEFT JOIN 
    image img ON img.id = ft.image_id
LEFT JOIN 
    market_pair_history mph ON EXISTS (
        SELECT 1 FROM market_pair mp 
        WHERE mp.token_a = ft.id AND mp.id = mph.pair_id
    )
GROUP BY 
    ft.id, img.image_url, ft.name, ft.symbol, ft.token_mint_address, ft.current_price
LIMIT $1 OFFSET $2
";

    let results = sql_query(query)
        .bind::<diesel::sql_types::Integer, _>(limit)
        .bind::<diesel::sql_types::Integer, _>(offset)
        .bind::<diesel::sql_types::Nullable<diesel::sql_types::Text>, _>(search_value)
        .load::<GetMarketPairDatabaseResponse>(connection)
        .expect("Database error");

    results
}

pub async fn get_active_tokens(params: GetUpdateTokenPairBody, connection: &mut PgConnection) -> Vec<GetActiveTokens> {

    let query = "
        SELECT 
    supplied_token.id as id,    
    supplied_token.name AS name,
    supplied_token.token_mint_address AS mint_address,
	market_pair.id AS marketpair_id
FROM 
    supplied_token
LEFT JOIN 
    image ON image.id = supplied_token.image_id
LEFT JOIN 
    market_pair ON supplied_token.id = market_pair.token_a
WHERE 
    supplied_token.symbol != 'USDC'
    ";

    let market_result = sql_query(query)
    .load(connection)
    .unwrap();

    market_result

    // crate::schema::supplied_token::dsl::supplied_token::table()
    // .load(connection)
    // .unwrap()
}

pub async fn update_token_prices_unnest(
    token_pairs: Vec<MarketPairToPriceUpdate>,
    conn: &mut PooledPg,
) -> usize {
    println!("before update: {:?}", token_pairs);

    let (ids, prices): (Vec<_>, Vec<_>) = token_pairs
        .iter()
        .map(|p| (p.marketpair_id, p.new_price.clone())) // Убедитесь, что new_price имеет тип BigDecimal
        .unzip();



    // Указываем, что транзакция возвращает тип ()
    conn.transaction::<(), diesel::result::Error, _>(|conn| {
        // 1. Вставка истории через UNNEST
        diesel::sql_query(
            "INSERT INTO market_pair_history (pair_id, current_price)
             SELECT * FROM UNNEST($1::uuid[], $2::numeric[])",
        )
        .bind::<diesel::sql_types::Array<diesel::sql_types::Uuid>, _>(&ids)
        .bind::<diesel::sql_types::Array<diesel::sql_types::Numeric>, _>(&prices)
        .execute(conn)?;

        Ok(())
    }).unwrap(); // Обрабатываем ошибку транзакции

    println!("price updated");

    token_pairs.len()
}