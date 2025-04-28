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
    merchant (id) {
        id -> Uuid,
        merchant_name -> Text,
        description -> Text,
        rating -> Nullable<Numeric>,
        dispute_rate -> Nullable<Numeric>,
        total_transactions -> Nullable<Int4>,
        successful_transactions -> Nullable<Int4>,
        image_id -> Nullable<Uuid>,
        is_premium -> Nullable<Bool>,
        is_verified -> Nullable<Bool>,
    }
}

diesel::table! {
    merchant_active_order (id) {
        id -> Uuid,
        escrow_address -> Text,
        order_amount -> Numeric,
        order_status -> Text,
        order_id -> Nullable<Uuid>,
        created_at -> Nullable<Timestamptz>,
        updated_at -> Nullable<Timestamptz>,
    }
}

diesel::table! {
    merchant_order (id) {
        id -> Uuid,
        description -> Text,
        operation_type -> Text,
        merchant_id -> Nullable<Uuid>,
        fiat_currency -> Text,
        asset_type -> Nullable<Uuid>,
        asset_amount -> Numeric,
        asset_limit_from -> Numeric,
        asset_limit_to -> Numeric,
        created_at -> Nullable<Timestamptz>,
        updated_at -> Nullable<Timestamptz>,
    }
}

diesel::table! {
    profile (id) {
        id -> Uuid,
        name -> Text,
        telegram_id -> Text,
        email -> Text,
        password -> Text,
        image_id -> Nullable<Uuid>,
        created_at -> Timestamp,
        updated_at -> Timestamp,
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
diesel::joinable!(merchant -> image (image_id));
diesel::joinable!(merchant_active_order -> merchant_order (order_id));
diesel::joinable!(merchant_order -> merchant (merchant_id));
diesel::joinable!(merchant_order -> supplied_token (asset_type));
diesel::joinable!(profile -> image (image_id));
diesel::joinable!(supplied_token -> image (image_id));

diesel::allow_tables_to_appear_in_same_query!(
    image,
    market_pair,
    market_pair_history,
    merchant,
    merchant_active_order,
    merchant_order,
    profile,
    supplied_token,
);
