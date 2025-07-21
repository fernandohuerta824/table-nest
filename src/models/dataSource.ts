import 'reflect-metadata';
import { DataSource } from 'typeorm'
import { User } from './User';
import { UserTokens } from './UserTokens';
import variables from '../helpers/dotenvConfig';

export function connectDB(url: string) {
    return new DataSource({
        type: 'postgres',
        url,
        synchronize: false,
        logging: false,
        entities: [User, UserTokens],
        migrations: [],
        subscribers: [],
    })
}

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: variables.DATABASE_URL,
    synchronize: false,
    logging: false,
    entities: [User, UserTokens],
    migrations: [],
    subscribers: [],
})
