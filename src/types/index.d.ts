export type refColumns = {
    [columnName: string]: {
        type: string,
        ref?: string,
        value: any
    }
}

export type UserFields = { 
    id: number
    username: string
    firstName: string
    lastName: string  
    password: string
    email: string
    phoneNumber: string
    phoneExt: string
    pendingEmail: string
    pendingPhoneNumber: string
    twoFactorEnabled: boolean
    createdAt: string
    updatedAt: string
    isBanned: boolean
}

export type SignupRequiredUser = Pick<UserFields, 'username' | 'firstName'  | 'password' >

export type SignupOptionalUser = Pick<UserFields, 'lastName' | 'email' | 'phoneNumber'>

export type SignupUser = SignupRequiredUser & SignupOptionalUser

export type UserTokenFields = {
    id: number
    userId: number
    token: string
    tokenType: 'reset_password' | 'confirm_email' | 'confirm_phone' | 'login_verification'
    expiresAt: string
    isActive: boolean,
    used: boolean
    createdAt: string
    revoked: string
}

export type TypeErrors = 'unprocessable' | 'unauthorized'
