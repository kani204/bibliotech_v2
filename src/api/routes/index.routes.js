import { Router } from 'express'
const indexRouter = new Router()

// Controladores
import BookController from '../controllers/book.controller.js'

indexRouter.get('/', (req, res) => { BookController.getHome(req, res) })
indexRouter.get('/catalogo', (req, res) => { BookController.getAll(req, res) })

indexRouter.get('/login', (req, res) => {
    const { error } = req.query

    res.render('login', { title: 'Iniciar sesión', error })
})

indexRouter.get('/registro', (req, res) => {
    res.render('register', { title: 'Registro' })
})

indexRouter.get('/perfil', (req, res) => {
    req.session.destroy()

    res.redirect('/')
})

indexRouter.get('/panel', (req, res) => {
    res.redirect('/')
})

export default indexRouter