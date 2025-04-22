use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
    Json
};

use thiserror::Error;
use std::
    fmt::{Display, Formatter, Result as FmtResult}
;

use serde::{Deserialize, Serialize};

#[derive(Debug, Error)]
pub enum AppError {
    #[error("Not found: {0}")]
    NotFound(String),

    #[error("Invalid input: {0}")]
    ValidationError(String),

    #[error("Conflict: {0}")]
    Conflict(String),

    #[error("Forbidden")]
    Forbidden,

    // #[error("Internal server error: {0}")]
    // InternalError(String),

    #[error("Bad request: {0}")]
    BadRequest(String),

    // #[error("Database error: {0}")]
    // DatabaseError(#[from] SqlxError), // SQLx errors
}

impl AppError {
    pub fn status_code(&self) -> StatusCode {
        match self {
            AppError::NotFound(_) => StatusCode::NOT_FOUND,
            AppError::ValidationError(_) => StatusCode::BAD_REQUEST,
            AppError::Conflict(_) => StatusCode::CONFLICT,
            AppError::Forbidden => StatusCode::FORBIDDEN,
            // AppError::InternalError(_) | AppError::DatabaseError(_) => {
            //     StatusCode::INTERNAL_SERVER_ERROR
            // }
            AppError::BadRequest(_) => StatusCode::BAD_REQUEST
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ErrorResponse {
    /// Error status, e.g., "fail" or "error"
    pub status:  String,
    /// Error message
    pub message: String
}

impl Display for ErrorResponse {
    /// Formats the error response for human-readable output.
    fn fmt(&self, f: &mut Formatter<'_>) -> FmtResult {
        write!(f, "Status: {}, Message: {}", self.status, self.message)
    }
}

pub type AppResult<T> = Result<T, AppError>;

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        tracing::error!("Error occurred: {}", self);

        let status = if self.status_code().is_client_error() {
            "fail"
        } else {
            "error"
        };

        let error_response = ErrorResponse {
            status:  status.to_string(),
            message: self.to_string()
        };

        let status_code = self.status_code();
        (status_code, Json(error_response)).into_response()
    }
    
}