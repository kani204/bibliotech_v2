import BookModel from "../models/book.model.js"

import connection from "../database.js"

class PanelController {
    static async getAll(req, res) {
        const { username, role } = req.session
        const libros = await BookModel.getAll()

        res.render('admin/librosPanel', { title: 'Panel - Libros', username, role, libros })
        
    }

    static async editById(req, res) {
        const { username, role } = req.session

        const { id } = req.params

        const db = await connection()

        const [libro] = await db.query(`SELECT * FROM libros WHERE LibroID = ${id}`)
        
        res.render('admin/editarLibro', { title: 'Editar libro', libro: libro[0], username, role })
    }
}

export default PanelController