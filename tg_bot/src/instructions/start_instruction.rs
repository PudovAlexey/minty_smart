pub mod initialize_start;
pub mod process_check_email;
pub mod initialize_registration_process;


#[derive(Debug, Clone)]
pub enum ProcessStartInstruction {
    InirializeRegistrationProcess,
    AlreadyRegistered,
    CheckEmaillProcess{email: String},
}