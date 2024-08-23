import { Router } from 'express'
const indexRouter = new Router()

import connection from '../database.js'
import { isLogged } from '../middlewares/auth.js'

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

indexRouter.get('/perfil', isLogged,async (req, res) => {
    const { username, role, userId } = req.session
    
    const db = await connection()

    const [verLuego] = await db.query(`SELECT l.LibroID, l.Titulo, l.imagen FROM libros l JOIN favoritos f ON f.LibroID = l.LibroID WHERE f.UsuarioID = ${userId} LIMIT 4`)
    const [seguidos] = await db.query(`SELECT l.LibroID, l.Titulo, l.imagen FROM libros l JOIN seguidos s ON s.LibroID = l.LibroID WHERE s.UsuarioID = ${userId} LIMIT 4`)
    const [gustados] = await db.query(`SELECT l.LibroID, l.Titulo, l.imagen FROM libros l JOIN gustados g ON g.LibroID = l.LibroID WHERE g.UsuarioID = ${userId} LIMIT 4`)

    res.render('perfil', { title: 'Perfil', verLuego, seguidos, gustados, username, role, userId })
})

indexRouter.get('/perfil/seguidos', isLogged, async (req, res) => {
    const { username, role, userId } = req.session

    const db = await connection()

    const [libros] = await db.query(`SELECT l.LibroID, l.Titulo, l.imagen FROM libros l JOIN seguidos s ON s.LibroID = l.LibroID WHERE s.UsuarioID = ${userId}`)

    res.render('perfil/seguidos.ejs', { title: 'Mis seguidos', libros, username, role, userId })
})
indexRouter.get('/perfil/gustados', isLogged, async (req, res) => {
    const { username, role, userId } = req.session

    const db = await connection()

    const [libros] = await db.query(`SELECT l.LibroID, l.Titulo, l.imagen FROM libros l JOIN gustados g ON g.LibroID = l.LibroID WHERE g.UsuarioID = ${userId}`)

    res.render('perfil/gustados', { title: 'Mis me gusta', libros, username, role, userId })
})
indexRouter.get('/perfil/ver-luego', isLogged, async (req, res) => {
    const { username, role, userId } = req.session

    const db = await connection()

    const [libros] = await db.query(`SELECT l.LibroID, l.Titulo, l.imagen FROM libros l JOIN favoritos f ON f.LibroID = l.LibroID WHERE f.UsuarioID = ${userId}`)

    res.render('perfil/verLuego', { title: 'Mis me gusta', libros, username, role, userId })
})

export default indexRouter