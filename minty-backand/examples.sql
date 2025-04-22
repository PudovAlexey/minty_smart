-- INSERT SUPPLIED TOKENS

INSERT INTO supplied_token 
(name, symbol, token_mint_address, image_id)
VALUES ('USDC Token', 'USDC', 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', '');

-- GET ALL SUPPLIED TOKENS
WITH latest_prices AS (
    SELECT 
        pair_id,
        current_price,
        created_at,
        ROW_NUMBER() OVER (PARTITION BY pair_id ORDER BY created_at DESC) AS rn
    FROM 
        market_pair_history
)

WITH latest_prices AS (
    SELECT 
        pair_id,
        current_price,
        created_at,
        ROW_NUMBER() OVER (PARTITION BY pair_id ORDER BY created_at DESC) AS rn
    FROM 
        market_pair_history
)

SELECT 
    image.image_url AS image_url,
    supplied_token.name AS name,
    supplied_token.symbol AS symbol,
    supplied_token.token_mint_address AS mint_address,
    lp.current_price AS current_price,  -- Get the latest current price
    STRING_AGG(mph.current_price::text, ',' ORDER BY mph.created_at DESC) AS historical_prices  -- Aggregate historical prices in order
FROM 
    supplied_token
LEFT JOIN 
    image ON image.id = supplied_token.image_id
LEFT JOIN 
    market_pair ON supplied_token.id = market_pair.token_a
LEFT JOIN 
    latest_prices lp ON market_pair.id = lp.pair_id AND lp.rn = 1  -- Join to get the latest price
LEFT JOIN 
    market_pair_history mph ON market_pair.id = mph.pair_id
WHERE 
    supplied_token.symbol != 'USDC'
GROUP BY 
    supplied_token.id, image.image_url, lp.current_price;  -- Include lp.current_price in GROUP BY



-- get market with marketpair
    SELECT 
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