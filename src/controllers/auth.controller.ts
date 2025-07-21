import type { Request, Response, NextFunction } from "express";
import { SignupUser } from "../types";
import Notification from "../classes/Notification";
import Email from "../classes/Email";
import { signupService } from "../services/auth.service";
import variables from "../helpers/dotenvConfig"

export async function signup (req: Request<{}, {}, SignupUser>, res: Response, next: NextFunction) {

    const { tokenEmail, tokenPhone, user } = await signupService(req.body)

    try {
        if(tokenPhone) {
            await Notification.sendConfirmation({
                to: variables.TWILIO_MY_PHONE_NUMBER,
                token: tokenPhone,
                username: user.username
            })
        }

        if(tokenEmail) {
            await Email.sendConfirmation({
                to: user.email,
                token: tokenEmail,
                username: user.username
            })
            
        }
    } catch (error) {
        
    }

    res.status(201).json({message: 'User has been created successfully'})
}