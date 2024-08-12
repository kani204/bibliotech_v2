const { Router } = require('express')
const indexRouter = new Router()

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

indexRouter.get('/', (req, res) => {
    try {
        const sql = "SELECT * FROM libros LIMIT 8;"

        db.query(sql, (err, results) => {
            res.render('index', { title: 'Bibliotech', libros: results })
        })
    } catch(err) {
        res.status(404).send(err)
        console.error(err)
    }
})

indexRouter.get('/catalogo', (req, res) => {
    try {
        const sql = "SELECT * FROM libros;"

        db.query(sql, (err, results) => {
            res.render('catalogo', { title: 'Catalogo', libros: results })
        })
    } catch(err) {
        res.status(404).send(err)
        console.error(err)
    }
})

indexRouter.get('/libro/:id', (req, res) => {
    const { id } = req.params

    try {
        const sql = `SELECT * FROM libros WHERE LibroID = ${id};`

        db.query(sql, (err, result) => {
            console.log(result)
            res.render('libro', { title: 'Libro', libro: result[0] })
        })
    } catch(err) {
        res.status(404).send(err)
        console.error(err)
    }
})

module.exports = indexRouter