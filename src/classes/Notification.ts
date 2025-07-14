import twilio from "twilio"

type confirmationParams = {
    to: string,
    username: string,
    token: string
}

class Notification {
    private readonly accountId = process.env.TWILIO_ACCOUNT_SID!
    private readonly authToken = process.env.TWILIO_AUTH_TOKEN!
    private readonly fromNumber = 'whatsapp:+14155238886'
    private readonly contentSidConfirm = process.env.TWILIO_CONTENT_SID
    private readonly client : twilio.Twilio
    
    constructor() {
        this.client = twilio(this.accountId, this.authToken)
    }


    public async sendConfirmation(params: confirmationParams) {
        await this.client.messages.create({
            from: this.fromNumber,
            to: params.to,
            contentSid: this.contentSidConfirm,
            contentVariables: `{"1":"${params.username}","2":"Table Nest/${params.token}", "3": "Table Nest"}`
        })
    }
}

export default new Notification()