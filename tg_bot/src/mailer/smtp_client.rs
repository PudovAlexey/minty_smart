use lettre::message::header::{ContentType};
use lettre:: {SmtpTransport, Transport};
use lettre::transport::smtp::authentication::Credentials;
use lettre::Message;

 pub struct Mailer {
    pub to: String,
    pub subject: String,
    pub header: ContentType,
    pub body: String,
 }
 


pub struct MailerClient {
    pub smtp_transport: String,
    pub smtp_username: String,
    pub smtp_password: String,
}

impl MailerClient {
    pub fn new(
        smtp_transport: String,
        smtp_username: String,
        smtp_password: String,
    ) -> Self {
        Self {
            smtp_transport,
            smtp_username,
            smtp_password,
        }
    }


    pub fn send_message(
        &self,
        mail: Mailer
    ) -> Result<String, String> {
        let Mailer {
            to,
            subject,
            header,
            body,
            ..
        } = mail;

        let email =  Message::builder()
        .from(self.smtp_username.parse().unwrap())
        // .reply_to("Yuin <yuin@domain.tld>".parse().unwrap())
        .to(to.parse().unwrap())
        .subject(subject)
        .header(header)
        .body(body)
        .unwrap();

        let creds = Credentials::new(self.smtp_username.to_owned(), self.smtp_password.to_owned());

        let mailer = SmtpTransport::relay(&self.smtp_transport)
            .unwrap()
            .credentials(creds)
            .build();

            match mailer.send(&email) {
                Ok(_) => Ok(String::from("Email sent successfully!")),
                Err(e) => {
                    println!("{}", e);
                    Err(String::from("error"))
                },
            } 
    }
}