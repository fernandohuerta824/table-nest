export type refColumns = {
    [columnName: string]: {
        type: string,
        ref?: string,
        value: any
    }
}

export type UserFields = { 
    id?: number
    username: string
    firstName: string
    lastName: string|null  
    password: string
    email: string|null
    phoneNumber: string|null
    phoneExt: string
    pendingEmail: string|null
    pendingPhoneNumber: string|null
    twoFactorEnabled: boolean
    createdAt: string
    updatedAt: string
    isBanned: boolean
}

export type SignupUser = Pick<UserFields, 'username' | 'firstName' | 'lastName' | 'password' | 'email' | 'phoneNumber'>

export type TypeErrors = 'unprocessable' | 'unauthorized'
