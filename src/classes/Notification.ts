import twilio from "twilio"
import variables from "./../helpers/dotenvConfig"

type confirmationParams = {
    to: string,
    username: string,
    token: string
}

class Notification {
    private readonly accountId: string
    private readonly authToken: string
    private readonly fromNumber: string
    private readonly contentSidConfirm: string
    private readonly client: twilio.Twilio

    constructor() {
        this.accountId = variables.TWILIO_ACCOUNT_SID
        this.authToken = variables.TWILIO_AUTH_TOKEN
        this.fromNumber = 'whatsapp:+14155238886'
        this.contentSidConfirm = process.env.TWILIO_CONTENT_SID!
        this.client = twilio(this.accountId, this.authToken)
    }


    public async sendConfirmation(params: confirmationParams) {

        const objectToSend = {
            to: `${params.to}`,
            from: this.fromNumber,
            contentSid: this.contentSidConfirm,
            contentVariables: `{"1":"${params.username}","2":"Table Nest/${params.token}", "3": "Table Nest"}`
        }
        await this.client.messages.create(objectToSend)


    }
}

export default new Notification()