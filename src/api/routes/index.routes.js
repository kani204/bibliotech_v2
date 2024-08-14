import { Router } from 'express'
const indexRouter = new Router()

// Controladores
import BookController from '../controllers/book.controller.js'

indexRouter.get('/', (req, res) => { BookController.getHome(req, res) })
indexRouter.get('/catalogo', (req, res) => { BookController.getAll(req, res) })

indexRouter.get('/login', (req, res) => {
    res.render('login', { title: 'Iniciar sesión' })
})

indexRouter.get('/registro', (req, res) => {
    res.render('register', { title: 'Registro' })
})

export default indexRouter