CREATE TABLE IF NOT EXISTS profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    telegram_id TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    image_id UUID REFERENCES image(id) ON DELETE SET NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS merchant (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_name TEXT NOT NULL,
    description TEXT NOT NULL,
    rating DECIMAL(3, 2) DEFAULT 0.00,
    dispute_rate DECIMAL(5, 2) DEFAULT 0.00,
    total_transactions INTEGER DEFAULT 0,
    successful_transactions INTEGER DEFAULT 0,
    image_id UUID REFERENCES image(id) ON DELETE SET NULL,
    is_premium BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS merchant_order (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    description TEXT NOT NULL,
    operation_type TEXT NOT NULL,
    merchant_id UUID REFERENCES merchant(id) ON DELETE SET NULL,
    fiat_currency TEXT NOT NULL,  
    asset_type UUID REFERENCES supplied_token(id) ON DELETE SET NULL,
    asset_amount DECIMAL(20, 8) NOT NULL,
    asset_limit_from DECIMAL(20, 8) NOT NULL,
    asset_limit_to DECIMAL(20, 8) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS merchant_active_order (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    escrow_address TEXT NOT NULL,
    order_amount DECIMAL(20, 8) NOT NULL,
    order_status TEXT NOT NULL,
    order_id UUID REFERENCES merchant_order(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);