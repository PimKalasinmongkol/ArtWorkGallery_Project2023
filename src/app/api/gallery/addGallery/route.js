const pool = require('../../db/pgDB')

export async function POST(request ,response) {
    let {title ,category ,author ,description} = request.body
    let {work} = request.files
    let random_id = Math.round(Math.random() * 10000)
    let dates = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
    
    try {
        let sqlCommand = 'insert into gallery (galley_id ,galley_title, galley_category, galley_author, galley_work, gallery_description ,galley_date) values ($1,$2,$3,$4,$5,$6,$7)'
        const client = await pool.connect()
        const result = await client.query(sqlCommand ,[random_id ,title ,category ,author ,work ,description ,dates])
        client.release()
        response.status(201).json({
            message: 'Gallery created successfully'
        })
    } catch (error) {
        console.error('Database error: ' + error.message)
        response.status(500).json(error.message)
    }
}