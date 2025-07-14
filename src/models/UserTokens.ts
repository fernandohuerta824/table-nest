import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { UserTokenFields } from "../types";
import { User } from "./User";

@Entity('user_tokens')
export class UserTokens extends BaseEntity implements UserTokenFields {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ nullable: false, name: 'user_id' })
    userId!: number

    @ManyToOne(() => User, user => user.tokens, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: User

    @Column({ nullable: false, unique: true })
    token!: string

    @Column({ nullable: false, name: 'token_type' })
    tokenType!: "reset_password" | "confirm_email" | "confirm_phone" | "login_verification"

    @Column({ nullable: false, name: 'expires_at' })
    expiresAt!: string

    @Column({ nullable: false, name: 'is_active' })
    isActive!: boolean

    @Column({ nullable: false }) 
    revoked!: string

    @Column({ nullable: false, name: 'created_at' })
    createdAt!: string

    @Column({ nullable: false }) 
    used!: boolean

    constructor(token?: Partial<UserTokenFields>) {
        super()
        Object.assign(this, token)
    }
}