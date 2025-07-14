import type { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { ErrorResponse } from "../classes/errors";
import { SignupUser } from "../types";

export const validateExistingUser = async (
    req: Request<{}, {}, SignupUser & { id?: number }>, res: Response, 
    next: NextFunction
) => {
    const { email, id, phoneNumber, username }  = req.body

    const existingUser = await User.findOne({
        where: [
            { email },
            { phoneNumber },
            { username },
            { id }
            
        ],
        select: ['id', 'email', 'phoneNumber', 'username']
    })

    if(existingUser) {
        const responseObject: Record<string, string> = {}
    
        if(existingUser.email && email === existingUser.email) {
            responseObject.email = `The email '${email}' already exists`
        }
    
        if(existingUser.phoneNumber && phoneNumber === existingUser.phoneNumber) {
            responseObject.phoneNumber = `The phone number '${phoneNumber}' already exists`
        }
            
        if(username && existingUser.username) {
            responseObject.username = `The username '${username}' already exists`
        }

        throw new ErrorResponse('userTaken', 'The user has already been taken', 409, responseObject)
    
    }

    next()
}