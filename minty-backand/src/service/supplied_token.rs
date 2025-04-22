use bigdecimal::BigDecimal;
use diesel::{r2d2::{ConnectionManager, PooledConnection}, PgConnection};

use reqwest;
use std::{collections::HashMap, sync::Arc};
use serde;
use tokio::time::{self, Duration};

use crate::{client::dto::supplied_token::{create_supplied_token_dto::{CreateSuppliedTokenBody, CreateSuppliedTokenResponce}, get_supplied_token_list_dto::{GetSuppliedListParams, GetSupplietListResponse}}, db::{model::supplied_token::{CreateSuppliedTokenSchemaBody, GetActiveTokens, GetUpdateTokenPairBody, MarketPair, MarketPairToPriceUpdate}, supplied_token::{create_supplied_token_query::create_supplied_token_query, get_supplied_token_query::{get_active_tokens, get_supplied_token_query_with_history, update_token_prices_unnest}}}, error::AppResult, AppState};

#[derive(serde::Serialize, serde::Deserialize)]
struct TokenInfo {
    address: String,
    logoURI: Option<String>,
    // Другие поля по необходимости
}

#[derive(serde::Serialize, serde::Deserialize)]
pub struct PriceData {
   pub price: BigDecimal
}

#[derive(serde::Serialize, serde::Deserialize)]
struct TokenPrice {
    pub data: HashMap<String, PriceData>
}

#[derive(serde::Serialize, serde::Deserialize)]
pub struct RequestBody {
    tokens: Vec<TokenInfo>
}


type PooledPg = PooledConnection<ConnectionManager<PgConnection>>;

pub async fn get_supplied_token_list(params: GetSuppliedListParams, connection: &mut PooledPg) -> AppResult<Vec<GetSupplietListResponse>> {
    let database_responce = get_supplied_token_query_with_history(params, connection).await;

    Ok(database_responce.iter().map(|e| {
        let map_prices: Vec<f32> = e.historical_prices
        .split(',') 
        .filter_map(|s| s.trim().parse::<f32>().ok())
        .collect();

        let image_url: String = e.image_url.as_ref().map(|s| s.clone()).unwrap_or_else(|| String::from(""));

        GetSupplietListResponse {
            image_url,
            name: e.name.to_string(),
            current_price: map_prices[map_prices.len() - 1],
            price_spread:  map_prices[0] - map_prices[map_prices.len() - 1],
            history: map_prices
        }
    }).collect())
}

pub async fn create_supplied_token(body: CreateSuppliedTokenBody, connection: &mut PooledPg) -> AppResult<CreateSuppliedTokenResponce> {
    let token_list_url = "https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json";
    let response = reqwest::get(token_list_url).await.unwrap();
    let res_body = response.text().await.unwrap(); 
    let token_list: RequestBody = serde_json::from_str(&res_body).unwrap();


    let token = token_list.tokens.into_iter()
    .find(|token| token.address == body.mint_address);


    
    let supplied_token = create_supplied_token_query(CreateSuppliedTokenSchemaBody {
        name: body.name,
        symbol: body.symbol,
        mint_address: body.mint_address,
        market_address: body.market_address,
        token_pair: body.token_pair,
        image_url: token.and_then(|t| t.logoURI).unwrap(),
    }, connection).unwrap();

    let mock_responce = CreateSuppliedTokenResponce {
        id: supplied_token,
    };

    Ok(mock_responce)
}

pub async fn price_update_queue(state: Arc<AppState>) -> AppResult<()> {
    let mut interval = time::interval(Duration::from_secs(60));
    
    loop {
        interval.tick().await;
        let connection = &mut state.db.get()
        .expect("Failed connection to POOL");
    let active_token_pairs = get_active_tokens(GetUpdateTokenPairBody {
        limit: 0,
        offset: 100,
    } ,connection).await;

// let mint_address = String::from("So11111111111111111111111111111111111111112,EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
let mint_addresses = String::from(&active_token_pairs.iter().map(|f| f.mint_address.to_string()).collect::<Vec<String>>().join(","));

let token_list_url = format!("https://lite-api.jup.ag/price/v2?ids={}", mint_addresses);

let response = reqwest::get(token_list_url).await.unwrap();
let res_body = response.text().await.unwrap(); 


let pairs_to_update: Vec<MarketPairToPriceUpdate> = active_token_pairs.iter().map(|GetActiveTokens {
    marketpair_id,
    mint_address,
    ..
}| {
    let price: TokenPrice = serde_json::from_str(&res_body).unwrap();
    let price_dict = price.data.get(mint_address).unwrap();
    let price = &price_dict.price;

    MarketPairToPriceUpdate {
        id: *marketpair_id,
        new_price: price.clone(),
    }
}).collect();

update_token_prices_unnest( pairs_to_update, connection).await;
}

}