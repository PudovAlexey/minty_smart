// @generated automatically by Diesel CLI.

diesel::table! {
    image (id) {
        id -> Uuid,
        image_url -> Text,
        created_at -> Timestamptz,
    }
}

diesel::table! {
    market_pair (id) {
        id -> Uuid,
        exchange_market_address -> Text,
        exchange_pair_name -> Text,
        token_a -> Uuid,
        token_b -> Uuid,
        created_at -> Timestamptz,
    }
}

diesel::table! {
    market_pair_history (id) {
        id -> Uuid,
        pair_id -> Uuid,
        current_price -> Numeric,
        created_at -> Timestamptz,
    }
}

diesel::table! {
    supplied_token (id) {
        id -> Uuid,
        name -> Text,
        symbol -> Text,
        token_mint_address -> Text,
        image_id -> Nullable<Uuid>,
        created_at -> Timestamptz,
        updated_at -> Timestamptz,
    }
}

diesel::joinable!(market_pair_history -> market_pair (pair_id));
diesel::joinable!(supplied_token -> image (image_id));

diesel::allow_tables_to_appear_in_same_query!(
    image,
    market_pair,
    market_pair_history,
    supplied_token,
);
