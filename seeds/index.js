const { seedDownUsers, seedUpUsers } = require('./insert-users')
const pg = require('pg');
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL
});


const mode = process.argv[2]

async function runMigrationsUp () {
    console.log('Running up seeds...')
    await seedUpUsers(pool)
    console.log('Migration done successfully')

}

async function runMigrationsDown() {
    console.log('Running down seeds...')
    await seedDownUsers(pool)
    console.log('Migration done successfully')
}

if(mode === 'up') {
    runMigrationsUp()
        .catch(error => {
            console.error(error)
            pool.end()
        })
        .finally(() => {
            pool.end()
        })
} else if(mode === 'down') {
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