const pool = require('../../../db/pgDB')
const bcrypt = require('bcrypt')

export default async function POST(request,response) {
    let {user_username, user_password} = request.body

    if (user_username && user_password) {
        const client = await pool.connect()
        const result = await client.query('select * from users where user_username = $1', [user_username])

        if (result.rows.length === 0 || !(await bcrypt.compare(user_password, result.rows[0].user_password))) {
            response.status(401).json({
                message: 'Invalid username or password'
            })
        } else {
            // send session for next.js
            response.status(200).json({
                user_data: result.rows[0]
            })
        }
    } else {
        response.status(400).json({
            message: 'Username and password are required'
        })
    }
}