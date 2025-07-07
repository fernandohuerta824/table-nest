const users = require('./users.json');
const { limitUsers, saltSeedPassword } = require('./parameters.js');
const dotenv = require('dotenv')
const bycriptjs = require('bcryptjs')

dotenv.config();


const limitedUsers = users.slice(0, limitUsers);

async function seedUpUsers(pool) {
    await pool.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE;');
    for (const user of limitedUsers) {
        const query = `
            INSERT INTO users (first_name, last_name, username, password, email, phone_number)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        const hashPassword = await bycriptjs.hash(user.password, saltSeedPassword)
        const values = [user.first_name, user.last_name, user.username, hashPassword, user.email, user.phone_number];
        await pool.query(query, values);
    }

    console.log(`Inserted ${limitedUsers.length} users into the database.`);
}

async function seedDownUsers(pool) {
    await pool.query('DELETE FROM users;')
    console.log(`Users deleted`);
}

module.exports = {
    seedDownUsers,
    seedUpUsers
}