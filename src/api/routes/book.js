import { Router } from 'express'
const bookRouter = new Router()

import connection from '../database.js'

import BookController from '../controllers/book.controller.js' 

bookRouter.get('/libro/:id', (req, res) => { BookController.getById(req, res) })

bookRouter.get('/libro/:id/editar', async (req, res) => {
    const { id } = req.params

    const db = await connection()

    const [libro] = await db.query(`SELECT * FROM libros WHERE LibroID = ${id}`)
    
    res.render('editar', { title: 'Editar libro', libro: libro[0] })
})

bookRouter.post('/libro/:id/editar', async (req, res) => {
    const { id } = req.params
    const { titulo, autor, isbn, cantidad_paginas, idioma, estado, sinopsis } = req.body
    const { filename } = req.file

    const db = await connection()

    let sql = `UPDATE libros SET Titulo = '${titulo}', Autor = '${autor}', ISBN = '${isbn}', CantidadPaginas = '${cantidad_paginas}', Idioma = '${idioma}', Estado = '${estado}', Sinopsis = '${sinopsis}' WHERE LibroID = ${id};`
    if(typeof filename != undefined) sql = `UPDATE libros SET Titulo = '${titulo}', Autor = '${autor}', ISBN = '${isbn}', CantidadPaginas = '${cantidad_paginas}', Idioma = '${idioma}', Estado = '${estado}', Sinopsis = '${sinopsis}', imagen = '/uploads/${filename}' WHERE LibroID = ${id};`

    try {
        const libro = await db.query(sql)
        res.redirect('/libro/' + id)
    } catch(err) {
        res.status(404).render('error')
        console.error(err)
    }
})

export default bookRouter

// bookRouter.get('/book/all', (req, res) => {
//     try {
//         const sql = "SELECT * FROM libros LIMIT 8;"

//         db.query(sql, (err, results) => {
//             res.render('index', { libros: results })
//         })
//     } catch(err) {
//         res.status(404).send(err)
//         console.error(err)
//     }
// })

// bookRouter.post('/book/create', (req, res) => {
//     const { titulo, autor, isbn, fechaLanzamiento, cantidadPaginas, editorial, sinopsis, idioma, estado } = req.body

//     const sql = "INSERT INTO libros (Titulo, Autor, ISBN, FechaLanzamiento, CantidadPaginas, Editorial, Sinopsis, Idioma, Estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);"

//     try {
//         db.query(sql, [titulo, autor, isbn, fechaLanzamiento, cantidadPaginas, editorial, sinopsis, idioma, estado], (error, results) => {
//             if(error) console.log(error)
//         })
//         res.status(200).send('created')
//     } catch(err) {
//         console.error(err)
//         res.status(404).send(err)
//     }
// })

// bookRouter.post('/book/delete', (req, res) => {
//     const { id } = req.body 

//     const sql = "DELETE FROM libros WHERE libroID = ?;"

//     try {
//         db.query(sql, [id])
//         res.status(200).send('deleted')
//     } catch(err) {
//         console.error(err)
//         res.status(404).send('error')
//     }
// })