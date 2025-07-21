import dotenv from 'dotenv'

dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const variables = {
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID!,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN!,
    TWILIO_CONTENT_SID: process.env.TWILIO_CONTENT_SID!,
    TWILIO_MY_PHONE_NUMBER: process.env.TWILIO_MY_PHONE_NUMBER!,
    DATABASE_URL: process.env.DATABASE_URL!,
    PORT: process.env.PORT || 8080
}

export default variables