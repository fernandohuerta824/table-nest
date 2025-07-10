import { UserFields } from "../types";
import Model from "./Model";

class User extends Model implements UserFields {
    protected static override table: string = 'users'

    id!: number;
    firstName!: string;
    lastName!: string;
    username!: string;
    password!: string;
    email!: string
    phoneNumber!: string
    phoneExt!: string
    pendingEmail!: string
    pendingPhoneNumber!: string
    twoFactorEnabled!: boolean
    createdAt!: string
    updatedAt!: string
    isBanned!: boolean

    constructor(data: UserFields) {
        super(data)
        Object.assign(this, data);
    }

}

export default User