const { Router } = require('express')
const bookRouter = new Router()

const mysql = require('mysql2')

// Base de datos
const db = mysql.createConnection({
    user: 'root',
    database: 'bibliotech_v2',
    password: '',
    port: 3306,
    host: 'localhost'
})

db.connect(err => { 
    if(err) throw new err
    console.log('Base de datos conectada')
})

bookRouter.get('/book/all', (req, res) => {
    try {
        const sql = "SELECT * FROM libros LIMIT 8;"

        db.query(sql, (err, results) => {
            res.render('index', { libros: results })
        })
    } catch(err) {
        res.status(404).send(err)
        console.error(err)
    }
})

bookRouter.post('/book/create', (req, res) => {
    const { titulo, autor, isbn, fechaLanzamiento, cantidadPaginas, editorial, sinopsis, idioma, estado } = req.body

    const sql = "INSERT INTO libros (Titulo, Autor, ISBN, FechaLanzamiento, CantidadPaginas, Editorial, Sinopsis, Idioma, Estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);"

    try {
        db.query(sql, [titulo, autor, isbn, fechaLanzamiento, cantidadPaginas, editorial, sinopsis, idioma, estado], (error, results) => {
            if(error) console.log(error)
        })
        res.status(200).send('created')
    } catch(err) {
        console.error(err)
        res.status(404).send(err)
    }
})

bookRouter.post('/book/delete', (req, res) => {
    const { id } = req.body 

    const sql = "DELETE FROM libros WHERE libroID = ?;"

    try {
        db.query(sql, [id])
        res.status(200).send('deleted')
    } catch(err) {
        console.error(err)
        res.status(404).send('error')
    }
})

module.exports = bookRouter