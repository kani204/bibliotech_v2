import { Router } from 'express'
const indexRouter = new Router()

// Controladores
import BookController from '../controllers/book.controller.js'

indexRouter.get('/', (req, res) => { BookController.getHome(req, res) })

indexRouter.get('/catalogo', (req, res) => { BookController.getAll(req, res) })

export default indexRouter