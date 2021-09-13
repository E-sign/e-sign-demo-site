export interface SignerData {
    name: string,
    email: string,
    document_authentication: {
        country_code: "44",
        phone: "12345678910",
        passcode: "test"
    },
    signer_options: {
        auto_reminder_frequncy: 7,
        id_check_required: false
    },
    signer_details: {
        primary_sequential_email: "string"
      }
}
