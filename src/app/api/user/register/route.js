const pool = require('../../db/pgDB');
const bcrypt = require('bcrypt');

export default async function POST (request, response) {
    let user_id = Math.floor(Math.random() * 100000)
    let {user_username, user_password, user_email, user_artistname, user_imageProfile} = request.body

    let sql = `INSERT INTO users (user_id, user_username, user_password, user_email, user_artistname, user_imageProfile) VALUES ($1, $2, $3, $4, $5, $6)`

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    user_password = await bcrypt.hash(user_password, salt);

    try {
        const client = await pool.connect()
        const result = await client.query(sql, [user_id, user_username, user_password, user_email, user_artistname, user_imageProfile])
        response.status(201).json({
            message: 'User created successfully'
        })
        client.release()
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}