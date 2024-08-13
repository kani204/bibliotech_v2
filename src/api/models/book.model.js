import connection from '../database.js'

class BookModel {
    static async getAll() {
        const db = await connection()

        const sql = "SELECT * FROM libros;"

        const [libros] = await db.query(sql)

        return libros
    }

    static async getHome() {
        const db = await connection()

        const recientesSql = "SELECT * FROM libros LIMIT 8;"
        const visitadosSql = "SELECT * FROM libros ORDER BY Visitas ASC LIMIT 6;"
        const gustadosSql = "SELECT * FROM libros ORDER BY Gustados ASC LIMIT 4;"

        const [recientes] = await db.query(recientesSql)
        const [visitados] = await db.query(visitadosSql)
        const [gustados] = await db.query(gustadosSql)

        return {
            recientes,
            visitados,
            gustados
        }
    }

    static async getById({ id }) {
        const db = await connection()

        const sql = `SELECT * FROM libros JOIN libros_categorias lc ON lc.LibroID = libros.LibroID JOIN categorias c ON lc.CategoriaID = c.CategoriaID WHERE libros.LibroID = ${id};`

        const [libro] = await db.query(sql)

        return libro
    }
}

export default BookModel