import { User } from "../models/User";
import { AppDataSource } from "../models/dataSource";
import { UserTokens } from "../models/UserTokens";
import { createToken } from "../helpers/createToken";
import { SignupUser } from './../types'

export const signupService = async (userData: SignupUser) => {
    const user = new User(userData)

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

        user.id = savedUser.id
    })  

    return { tokenEmail, tokenPhone, user }
}