import BookModel from '../models/book.model.js'

class BookController {
    static async getHome(req, res) {
        try {
            const { recientes, visitados, gustados } = await BookModel.getHome()
            res.status(200).render('index', { title: 'Bibliotech', recientes, visitados, gustados })
        } catch(err) {
            res.status(404).render('error', { title: 'Error 404', err })
            console.error(err)
        }
    }

    static async getAll(req, res) {
        try {
            const libros = await BookModel.getAll()
            res.status(200).render('catalogo', { title: 'Catalogo', libros })
        } catch(err) {
            res.status(404).render('error', { title: 'Error 404', err })
            console.error(err)
        }
    }

    static async getById(req, res) {
        const { id } = req.params

        try {
            const libro = await BookModel.getById({ id })
            res.status(200).render('libro', { title: 'Libro', libro })
        } catch(err) {
            res.status(404).render('error', { title: 'Error 404', err })
            console.error(err)
        }
    }
}

export default BookController