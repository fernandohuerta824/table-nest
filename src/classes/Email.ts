import nodemailer, { Transporter } from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport"

type confirmationParams = {
    to: string,
    token: string,
    username: string
}

class Email {
    private readonly host = process.env.MAIL_TRAP_HOST!
    private readonly port = 2525
    private readonly user = process.env.MAIL_TRAP_USER!
    private readonly pass = process.env.MAIL_TRAP_PASS!
    private readonly fromEmail = 'johnDoe@.test.com'
    private readonly transport: Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>

    constructor() {
        this.transport = nodemailer.createTransport({
            host: this.host,
            port: this.port,
            auth: {
                user: this.user,
                pass: this.pass
            }
        })
    }

    public async sendConfirmation (params: confirmationParams) {
        await this.transport.sendMail({
            from: this.fromEmail,
            to: params.to,
            subject: 'Confirmar cuenta en Table nest',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
                    <h2 style="color: #333;">Hola, ${params.username} 👋</h2>
                    <p style="color: #555; font-size: 16px;">
                    Gracias por registrarte en <strong>Table Nest</strong>. Para confirmar tu cuenta, haz clic en el botón de abajo:
                    </p>
                    <div style="text-align: center; margin: 30px 0;">
                    <a href="https://yourapp.com/confirm-email/${params.token}"
                        style="background-color: #3b82f6; color: #fff; padding: 12px 24px; border-radius: 5px; text-decoration: none; display: inline-block; font-size: 16px;">
                        Confirmar cuenta
                    </a>
                    </div>
                    <p style="color: #777; font-size: 14px;">
                    Si no solicitaste esta cuenta, puedes ignorar este correo.
                    </p>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                    <p style="color: #aaa; font-size: 12px; text-align: center;">
                    &copy; ${new Date().getFullYear()} Table Nest. Todos los derechos reservados.
                    </p>
                </div>
            `
        })
    }
}

export default new Email()