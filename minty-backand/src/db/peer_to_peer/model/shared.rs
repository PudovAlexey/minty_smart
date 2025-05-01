#[derive(Clone)]
pub enum OrderStatus {
    Opened,         // order was created
    UserConfirmed,  // user sent money
    Canceled,       // user canceled order (исправлено Caneled -> Canceled)
    Succeeded,      // money was sent to buyer (исправлено Successed -> Succeeded)
    Rejected,       // technical error
    Disputed,       // dispute was created
    Expired,        // expired
}

impl From<OrderStatus> for String {
    fn from(val: OrderStatus) -> Self {
        match val {
            OrderStatus::Opened => "Opened",
            OrderStatus::UserConfirmed => "UserConfirmed",
            OrderStatus::Canceled => "Canceled",
            OrderStatus::Succeeded => "Succeeded",
            OrderStatus::Rejected => "Rejected",
            OrderStatus::Disputed => "Disputed",
            OrderStatus::Expired => "Expired",
        }.to_string()
    }
}

pub enum OperationType {
    Buy,
    Sell,
}

impl Into<String> for OperationType {
    fn into(self) -> String {
        match self {
            OperationType::Buy => "Buy".to_string(),
            OperationType::Sell => "Sell".to_string(),
        }
    }
}

pub enum FiatCurrency {
    USD
}

impl Into<String> for FiatCurrency {
    fn into(self) -> String {
        match self {
            FiatCurrency::USD => "USD".to_string(),
        }
    }
}
