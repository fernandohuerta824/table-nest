const { seedDownUsers, seedUpUsers } = require('./insert-users')
const pg = require('pg')
const dotenv = require('dotenv')
const { execSync } = require('child_process')

const mode = process.argv.find(arg => arg.startsWith('mode='))?.split('=')[1]
const type = process.argv[2]
const path = mode === 'test' ? '.env.test' : '.env'
const numUsers = +process.argv.
    find(arg => arg.startsWith('users='))
    ?.split('=')[1]

const limitUsers = isFinite(numUsers) && numUsers > 0 && numUsers <= 1000 ? numUsers : 1000


dotenv.config({ path })

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL
})


async function runMigrationsUp () {
    execSync('npm run migrate:up')
    console.log('Running up seeds...')
    await seedUpUsers(pool, limitUsers)
    console.log('Seeds done successfully')

}

async function runMigrationsDown() {
    execSync('npm run migrate:up')
    console.log('Running down seeds...')
    await seedDownUsers(pool)
    console.log('Seeds done successfully')
}

if(type === 'up') {
    runMigrationsUp()
        .catch(error => {
            console.error(error)
            pool.end()
        })
        .finally(() => {
            pool.end()
        })
} else if(type === 'down') {
    runMigrationsDown()
        .catch(error => {
            console.error(error)
        })
        .finally(() => {
            pool.end()
        })
} else {
    console.info('Command not valid')
    process.exit(1)
}