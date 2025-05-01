use std::sync::{Arc, Mutex};
use std::time::Duration;
use tokio::time::sleep;

use socketioxide::{extract::SocketRef, layer::SocketIoLayer, SocketIo};

use crate::db::supplied_token::model::supplied_token_model::MarketPairToPriceUpdate;
use crate::{AppState};

pub type PriceHandler = dyn Fn(&MarketPairToPriceUpdate) + Send + Sync + 'static;

pub struct PriceUpdateSocket {
    pub layer: SocketIoLayer,
    pub price_handler: Box<dyn for<'a> Fn(&'a Vec<MarketPairToPriceUpdate>) + Send + Sync + 'static>,
}


#[derive(Default)]
struct SocketStore {
  pub sockets: Mutex<Vec<SocketRef>>,
}

pub fn socket_entry_point(state: Arc<AppState>) -> PriceUpdateSocket {
    let socket_store = Arc::new(SocketStore::default());
    let (layer, io) = SocketIo::new_layer();

    io.ns("/prices.io", {
        let socket_store = Arc::clone(&socket_store);
        
        move |socket: SocketRef| {
            let socket_store = Arc::clone(&socket_store);
            async move {
                socket_store.sockets.lock().unwrap().push(socket.clone());
                
                socket.on_disconnect(move |socket: SocketRef| {
                    let socket_store = Arc::clone(&socket_store);
                    async move {
                        let mut sockets = socket_store.sockets.lock().unwrap();
                        sockets.retain(|s| s.id != socket.id);
                    }
                });
            }
        }
    });
    // Функция для отправки обновлений цен всем подключенным клиентам
    let price_handler = {
        let socket_store = Arc::clone(&socket_store);
        move |updates: &Vec<MarketPairToPriceUpdate>| {
            let socket_store = Arc::clone(&socket_store);
            let updates_arc = Arc::new(updates.clone());

            tokio::spawn(async move {
        
            let updates = updates_arc.clone();
        
            let json = serde_json::json!(&*updates);

                let sockets = socket_store.sockets.lock().unwrap();
                for socket in sockets.iter() {
                    if let Err(e) = socket.emit("new_prices", &json) {
                        eprintln!("Failed to send update: {}", e);
                    }
                }
            });
        }
    };

    PriceUpdateSocket {
        layer,
        price_handler: Box::new(price_handler),
    }
}