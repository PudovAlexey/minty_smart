use super::shared::OrderStatus;
use bigdecimal::BigDecimal;
use diesel::{prelude::{Insertable, Queryable}, Selectable};

pub struct CreateMerchantActiveOrderBody {
    pub escrow_address: String,
    pub order_amount: BigDecimal,
    pub order_status: OrderStatus,
    pub order_id: uuid::Uuid,
    pub user_id: uuid::Uuid,
}


#[derive(Selectable, Insertable)]
#[diesel(table_name = crate::schema::merchant_active_order)]
pub struct CreateMerchantActiveOrderSchema {
   pub escrow_address: String,
   pub order_amount: BigDecimal,
   pub order_status: String,
   pub order_id: uuid::Uuid,
   pub user_id: uuid::Uuid,
}
#[derive(Debug)]
pub struct CreateMerchantActiveOrderTransactionResult {
    pub id: uuid::Uuid,
}

impl Queryable<diesel::sql_types::Uuid, diesel::pg::Pg> for CreateMerchantActiveOrderTransactionResult {
    type Row = uuid::Uuid;

    fn build(row: Self::Row) -> diesel::deserialize::Result<Self> {
        Ok(Self { id: row })
    }
}

impl From<&CreateMerchantActiveOrderBody> for CreateMerchantActiveOrderSchema {
     fn from(value: &CreateMerchantActiveOrderBody) -> Self {
        let escrow = value.escrow_address.to_string();
        let order_amount = value.order_amount.clone();
        let order_status = value.order_status.clone().into();

        Self {
            escrow_address: escrow,
            order_amount: order_amount,
            order_status: order_status,
            order_id: value.order_id,
            user_id: value.user_id,
    }
}
}