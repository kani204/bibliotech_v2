const express = require('express')

const path = require('node:path')

const app = express()

// Config
const port = process.env.PORT || 3000
app.set('views', path.join(__dirname, '../web/views'))
app.set('view engine', 'ejs')

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Rutas
app.use(require('./routes/index.routes'))
app.use(require('./routes/book'))
// app.use(require('./routes/user'))

// Estaticos
app.use(express.static(path.join(__dirname, '../web/public')))
app.use('/libro', express.static(path.join(__dirname, '../web/public')))

// Iniciar servidor
app.listen(port, () => {
    console.log('Servidor encendido')
})