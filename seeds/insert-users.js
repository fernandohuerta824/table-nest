const users = require('./users.json');
const bycriptjs = require('bcryptjs');
const { insertPendingToken } = require('./helpers/create-tokens.js');

async function seedUpUsers(pool, limitUsers) {
    const limitedUsers = users.slice(0, limitUsers);
    await pool.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE;');
    await pool.query('TRUNCATE TABLE user_tokens RESTART IDENTITY CASCADE;');

    for (const user of limitedUsers) {
        try {
            await pool.query('BEGIN;')
            const userQuery = `
                INSERT INTO users (first_name, last_name, username, password, email, phone_number)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
            `;

            const phoneNumber =  user.phone_number ? user.phone_number.replaceAll('-', '') : null
            
            const hashPassword = await bycriptjs.hash(user.password, 1)
            const userValues = [user.first_name, user.last_name, user.username, hashPassword, user.email, phoneNumber];
            
            const { rows } = await pool.query(userQuery, userValues);
            const newUser = rows[0]
            
            if(newUser.pending_email) {
                await insertPendingToken(pool, 'confirm_email', newUser.id)
            }

            if(newUser.pending_phone_number) {
                await insertPendingToken(pool, 'confirm_phone', newUser.id)
            }
            await pool.query('COMMIT;')
        } catch(error) {
            await pool.query('ROLLBACK;')
            console.log(error)
        }
         
    }

    console.log(`Inserted ${limitedUsers.length} users into the database.`);
}

async function seedDownUsers(pool) {
    await pool.query('TRUNCATE TABLE user_tokens RESTART IDENTITY CASCADE;')
    console.log(`User tokens deleted`);
    await pool.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE;');
    console.log(`Users deleted`);

}

module.exports = {
    seedDownUsers,
    seedUpUsers
}