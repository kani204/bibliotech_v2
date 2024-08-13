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
        const recientesSql = "SELECT * FROM libros LIMIT 8;"
        const visitadosSql = "SELECT * FROM libros ORDER BY Visitas ASC;"
        const gustadosSql = "SELECT * FROM libros ORDER BY Gustados ASC LIMIT 4;"

        db.query(recientesSql, (err, results) => {
            db.query(visitadosSql, (err, visitados) => {
                db.query(gustadosSql, (err, gustados) => {
                    res.render('index', { title: 'Bibliotech', libros: results, visitados, gustados })
                })
            })
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
        const sql = `SELECT * FROM libros JOIN libros_categorias lc ON lc.LibroID = libros.LibroID JOIN categorias c ON lc.CategoriaID = c.CategoriaID WHERE libros.LibroID = ${id};`

        db.query(sql, (err, result) => {
            res.render('libro', { title: 'Libro', libro: result })
        })
    } catch(err) {
        res.status(404).send(err)
        console.error(err)
    }
})

module.exports = indexRouter