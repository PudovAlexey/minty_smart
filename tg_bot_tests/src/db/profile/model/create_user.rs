
use diesel::{
    Insertable, Queryable, Selectable
};


#[derive(Selectable, Insertable)]
#[diesel(table_name = crate::schema::profile)]
pub struct CreateUserBody {
   pub name: String,
   pub telegram_id: String,
   pub email: String,
//    pub image_url: String,
}

#[derive(Debug)]
pub struct CreateUserBodyResult {
    pub id: uuid::Uuid,
}

impl Queryable<diesel::sql_types::Uuid, diesel::pg::Pg> for CreateUserBodyResult {
    type Row = uuid::Uuid;

    fn build(row: Self::Row) -> diesel::deserialize::Result<Self> {
        Ok(Self { id: row })
    }
}