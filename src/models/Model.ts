import { refColumns } from "../types"
import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config();


const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL
})

class Model {
    protected static table: string

    protected static refColumns: refColumns = {}

    protected static pool: pg.Pool = pool

    constructor(data: any) {
        Object.assign(this, data);
    }

//     {
//     id: 50,
//     first_name: 'Maggi',
//     last_name: null,
//     username: 'mstead1d',
//     password: '$2b$10$uqFfY5BgozrA4tkX4mvRle.KCIYL.gtDDoxEF2gk71PtbrL81rJSi',
//     email: 'mwhymark1d@bandcamp.com',
//     phone_number: '485-820-7938',
//     phone_ext: null,
//     pending_email: 'mwhymark1d@bandcamp.com',
//     pending_phone_number: '485-820-7938',
//     two_factor_enabled: false,
//     created_at: 2025-07-08T18:32:00.629Z,
//     updated_at: 2025-07-08T18:32:00.629Z,
//     is_banned: false
//   }
    protected static fromSnakeCaseToCameCase(fields: Array<{[x: string]: any}>) {
        return fields.map(f => {
            const fields = Object.entries(f)
            const object: {[x: string]: any}  = {}
            fields.forEach(([field, value]) => {
                const words = field.toLowerCase().split('_')
                const capitalize = words.slice(1).map(w => w[0].toUpperCase() + w.slice(1)).join('')
                object[`${words[0]}${capitalize}`] = value
            })
            return object
        }) 
    }

    static async getAll<T extends Model>(this: { new(data: any): T } & typeof Model, columns?: (keyof T)[], ts?: pg.Pool): Promise<T[]> {
        const client = ts || this.pool;
        const selectColumns = columns?.length ? columns.join(', ') : '*';
        const { rows } = await client.query(`SELECT ${selectColumns} FROM ${this.table}`);
        const camelCaseRows = this.fromSnakeCaseToCameCase(rows)

        return camelCaseRows.map(row => new this(row));
    }
    

    static async save<T extends Model>(this: { new(data: any): T } & typeof Model, ts?: pg.Pool) {

    }



    
}

export default Model