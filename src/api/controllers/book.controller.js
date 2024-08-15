import BookModel from '../models/book.model.js'

class BookController {
    static async getHome(req, res) {
        const { username, role } = req.session

        try {
            const { recientes, visitados, gustados } = await BookModel.getHome()

            res.status(200).render('index', { title: 'Bibliotech', recientes, visitados, gustados, username, role })
        } catch(err) {
            res.status(404).render('error', { title: 'Error 404', err })
            console.error(err)
        }
    }

    static async getAll(req, res) {
        const { username, role } = req.session

        const { generoId, title } = req.query

        try {
            const libros = title ? await BookModel.getByTitle({ title }) : await BookModel.getAll({ genre: generoId })   

            console.log(libros)
            res.status(200).render('catalogo', { title: 'Catalogo', libros, username, role })
        } catch(err) {
            res.status(404).render('error', { title: 'Error 404', err })
            console.error(err)
        }
    }

    static async getById(req, res) {
        const { username, role } = req.session

        const { id } = req.params
        
        try {
            const libro = await BookModel.getById({ id })

            res.status(200).render('libro', { title: 'Libro', libro, username, role })
        } catch(err) {
            res.status(404).render('error', { title: 'Error 404', err })
            console.error(err)
        }
    }

    static async getByTitle(req, res) {
        const { username, role } = req.session

        const { title } = req.params

        try {
            const libros = await BookModel.getByTitle({ title })

            res.status(200).render('catalogo', { title: 'Libros', libros, username, role })
        } catch(err) {
            res.status(404).render('error', { title: 'Error 404', err })
            console.error(err)
        }
    }
}

export default BookController