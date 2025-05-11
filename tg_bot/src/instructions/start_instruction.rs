pub mod initialize_start;
pub mod process_check_email;


#[derive(Debug, Clone)]
pub enum ProcessStartInstruction {
    StartInstructionStart,
    AlreadyRegistered,
    StartRegistrationProcess{email: String},
}