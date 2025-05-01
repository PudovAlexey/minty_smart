use diesel::prelude::*;
use diesel::result::Error;
use diesel::{r2d2::{ConnectionManager, PooledConnection}, PgConnection};

use super::model::supplied_token_model::{CreateImageSchema, CreateSuppliedTokenSchema, CreateSuppliedTokenSchemaBody};


type PooledPg = PooledConnection<ConnectionManager<PgConnection>>;

pub fn create_supplied_token_query(
    body: CreateSuppliedTokenSchemaBody,
    conn: &mut PooledPg,
) -> Result<uuid::Uuid, Error> {
    // Perform all operations within a single transaction
    conn.transaction(|conn| {
        // First create the image record
        let new_image = CreateImageSchema {
            image_url: body.image_url,
        };
        
        let image_id: uuid::Uuid = diesel::insert_into(crate::schema::image::table)
            .values(&new_image)
            .returning(crate::schema::image::id)
            .get_result(conn)?;

        // Then create the token record
        let new_token = CreateSuppliedTokenSchema {
            name: body.name,
            symbol: body.symbol,
            token_mint_address: body.mint_address,
            image_id: Some(image_id),
        };

        // Insert the token record
        diesel::insert_into(crate::schema::supplied_token::table)
            .values(&new_token)
            .execute(conn)?;

        // Return the image_id
        Ok(image_id)
    })
}

pub async fn update_supplied_tokens_price() {
    
}