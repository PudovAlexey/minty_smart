CREATE TABLE IF NOT EXISTS image (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_url TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS supplied_token (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    symbol TEXT NOT NULL,
    token_mint_address TEXT NOT NULL UNIQUE,  -- Уникальный адрес mint
    image_id UUID REFERENCES image(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    sol_market_address TEXT NOT NULL UNIQUE -- TODO Добавить
);

CREATE TABLE IF NOT EXISTS market_pair (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    market_address TEXT NOT NULL, -- TODO Добавить
    exchange_market_address TEXT NOT NULL,
    exchange_pair_name TEXT NOT NULL,
    token_a UUID NOT NULL REFERENCES supplied_token(id) ON DELETE CASCADE,
    token_b UUID NOT NULL REFERENCES supplied_token(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(exchange_market_address, exchange_pair_name)  -- Fixed the unique constraint
);

CREATE TABLE IF NOT EXISTS market_pair_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pair_id UUID NOT NULL REFERENCES market_pair(id) ON DELETE CASCADE,
    current_price DECIMAL(32, 16) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()  -- Removed trailing comma here
);