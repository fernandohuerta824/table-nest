import 'reflect-metadata';
import { DataSource } from 'typeorm'
import dotev from 'dotenv'
import { User } from './User';
import { UserTokens } from './UserTokens';


dotev.config()

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL as string,
  database: process.env.DATABASE_NAME as string,
  synchronize: false,      // Importante: no sincronizar esquema
  logging: false,
  entities: [User, UserTokens],
  migrations: [],          // No usar migraciones ORM
  subscribers: [],
});