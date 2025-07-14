import type { Request, Response, NextFunction } from "express";
import { SignupUser, UserFields } from "../types";
import { User } from "../models/User";
import { AppDataSource } from "../models/dataSource";
import { UserTokens } from "../models/UserTokens";
import { createToken } from "../helpers/createToken";
import Notification from "../classes/Notification";
import Email from "../classes/Email";

export async function signup (req: Request<{}, {}, SignupUser>, res: Response) {
    const user = new User(req.body)

    await user.hashPassword()

    let tokenEmail = ''
    let tokenPhone = ''
    await AppDataSource.manager.transaction(async ts => {
        const savedUser = await ts.save<User>(user)!
        
        if(user.email) {
            const { rawToken, token } = createToken('confirm_email', savedUser.id)
            const emailToken = new UserTokens(token)
            tokenEmail = rawToken
            await ts.save(emailToken)
        }

        if(user.phoneNumber) {
            const { rawToken, token } = createToken('confirm_phone', savedUser.id)
            const phoneToken = new UserTokens(token)
            tokenPhone = rawToken
            await ts.save(phoneToken)
        }

    })

    if(tokenPhone) {

        await Notification.sendConfirmation({
            to: process.env.TWILIO_MY_PHONE_NUMBER as string,
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

    res.status(201).json({message: 'User has been created successfully'})
}