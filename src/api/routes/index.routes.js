import { Router } from 'express'
const indexRouter = new Router()

import connection from '../database.js'

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

indexRouter.get('/perfil', async (req, res) => {
    const { username, role, userId } = req.session
    
    const db = await connection()

    const [verLuego] = await db.query(`SELECT l.LibroID, l.Titulo, l.imagen FROM libros l JOIN favoritos f ON f.LibroID = l.LibroID WHERE f.UsuarioID = ${userId}`)
    
    res.render('perfil', { title: 'Perfil', verLuego, username, role, userId })
})

export default indexRouter