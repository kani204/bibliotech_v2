import connection from '../database.js'

class BookModel {
    static async getAll({ title, genre } = {}) {
        const db = await connection()

        let sql

        if(!title && !genre) {
            sql = `SELECT * FROM libros`
        }

        if(title) {
            sql = `SELECT * FROM libros WHERE Titulo LIKE '%${title}%'`
        }

        if(genre && genre != 'off') {
            sql = `SELECT l.LibroID, l.Titulo, l.imagen FROM libros l JOIN libros_categorias lc ON l.LibroID = lc.LibroID JOIN categorias c ON lc.CategoriaID = c.CategoriaID WHERE c.CategoriaID = '${genre}'`
        }

        if(title && genre != 'off') {
            sql = `SELECT l.LibroID, l.Titulo, l.imagen FROM libros l JOIN libros_categorias lc ON l.LibroID = lc.LibroID JOIN categorias c ON lc.CategoriaID = c.CategoriaID WHERE c.CategoriaID = '${genre}' AND l.Titulo LIKE '%${title}%'`
        }

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

    static async getCategories() {
        const db = await connection()

        const sql = 'SELECT c.CategoriaID as id, c.NombreCategoria as name FROM categorias c'

        const [categorias] = await db.query(sql)

        return categorias
    }

    static async getById({ id }) {
        const db = await connection()

        const sql = `SELECT * FROM libros JOIN libros_categorias lc ON lc.LibroID = libros.LibroID JOIN categorias c ON lc.CategoriaID = c.CategoriaID WHERE libros.LibroID = ${id};`

        const [libro] = await db.query(sql)
 
        return libro
    }

    static async getByTitle({ title }) {
        const db = await connection()

        const sql = `SELECT LibroID, Titulo, imagen FROM libros WHERE Titulo LIKE '%${title}%'`

        const [libros] = await db.query(sql)

        return libros
    }

    static async createBook({ book }) {
        const { titulo, autor, isbn, fechaLanzamiento, cantidadPaginas, editorial, sinopsis, imagen, pdf_link, idioma, estado, visitas, gustados } = book

        const db = await connection()

        const sql = `INSERT INTO libros ('Titulo', 'Autor', 'ISBN', 'FechaLanzamiento', 'CantidadPaginas', 'Editorial', 'Sinopsis', 'imagen', 'pdf_link', 'Idioma', 'Estado', 'Visitas', 'Gustados') VALUES ('${titulo}', '${autor}', '${isbn}', '${fechaLanzamiento}', '${cantidadPaginas}', '${editorial}', '${sinopsis}', '${imagen}', '${pdf_link}', '${idioma}', '${estado}', '${visitas}', '${gustados}');`

        try {
            const libro = await db.query(sql)
            return libro
        } catch(err) {
            console.error(err)
        }
    }

    static async deleteById({ id }) {
        const db = await connection()

        const sql = `DELETE FROM libros WHERE LibroID = '${id}';`

        await db.query(sql)
    }
}

export default BookModel