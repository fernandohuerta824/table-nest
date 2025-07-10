export async function insertPendingToken(pool, type, userId) {
    const token = crypto.randomUUID().split('-').join('').substring(0, 32)
    const tokenQuery = `
        INSERT INTO user_tokens (user_id, token, token_type) VALUES ($1, $2, $3)
        `   
    const tokenValues = [userId, token, type]
    await pool.query(tokenQuery, tokenValues);
 
}