const pool = require('../../db/pgDB')

export async function GET(request ,response) {
    let search_keyword = request.query.search_keyword
    try {
        const sqlCommand = 'select * from gallery'
        const client = await pool.connect()
        const result = await client.query(sqlCommand)
        const data = await result.rows

        const search_filter_data = data.filter(gallery => {
            return gallery.galley_title.toLowerCase().includes(search_keyword.toLowerCase())
            || gallery.galley_category.toLowerCase().includes(search_keyword.toLowerCase())
            || gallery.galley_author.toLowerCase().includes(search_keyword.toLowerCase())
            || gallery.gallery_description.toLowerCase().includes(search_keyword.toLowerCase())
        })

        if (search_filter_data.length > 0) {
            response.status(200).json(search_filter_data)
        } else {
            response.status(404).json({
                message: 'No results found'
            })
        }

        client.release()
        response.status(200).json(data)
    } catch (error) {
        console.error('Database error:'+ error.message)
        response.status(500).json(error.message)
    }
}