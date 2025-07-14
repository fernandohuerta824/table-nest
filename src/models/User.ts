import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import bycript from 'bcryptjs'
import { UserFields } from '../types';
import { UserTokens } from './UserTokens';

@Entity('users')
export class User extends BaseEntity implements UserFields {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ nullable: false, unique: true })
    username!: string

    @Column({ unique: false, name: 'first_name', nullable: false })
    firstName!: string

    @Column({ unique: false, name: 'last_name', nullable: true })
    lastName!: string

    @Column({nullable: false })
    password!: string;

    @Column({ nullable: true, unique: true})
    email!: string

    @Column({ unique: false, name: 'phone_number', nullable: true })
    phoneNumber!: string;

    @Column({ unique: false, name: 'phone_ext', nullable: true })
    phoneExt!: string

    @Column({ unique: false, name: 'pending_email', nullable: true })
    pendingEmail!: string;

    @Column({ unique: false, name: 'pending_phone_number', nullable: true })
    pendingPhoneNumber!: string;

    @Column({ nullable: false, default: false, name: 'two_factor_enabled' })
    twoFactorEnabled!: boolean

    @Column({ nullable: false, name: 'created_at' })
    createdAt!: string;

    @Column({ nullable: false, name: 'updated_at' })
    updatedAt!: string

    @Column({ nullable: false, default: false, name: 'is_banned' })
    isBanned!: boolean;

    @OneToMany(() => UserTokens, token => token.user)
    tokens!: UserTokens[]

    constructor(user?: Partial<UserFields>) {
        super()
        Object.assign(this, user)
    }

    public async hashPassword(salt = 10) {
        this.password = await bycript.hash(this.password, salt)
    }
    
}

