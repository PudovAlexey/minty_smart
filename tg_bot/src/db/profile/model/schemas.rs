use diesel::{Selectable, prelude::Queryable};

#[derive(Queryable, Selectable)]
#[diesel(table_name = crate::schema::profile)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct ProfileResponse {
    #[diesel(sql_type = diesel::sql_types::Uuid)]
    pub id: uuid::Uuid,
    #[diesel(sql_type = diesel::sql_types::Text)]
    pub name: String,
    #[diesel(sql_type = diesel::sql_types::Text)]
    pub telegram_id: String,
    #[diesel(sql_type = diesel::sql_types::Text)]
    pub email: String,
}
