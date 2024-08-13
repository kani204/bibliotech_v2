import express from 'express'
import path from 'node:path'

const app = express()

// Config
const port = process.env.PORT || 3000
app.set('views', path.join(process.cwd(), 'src/web/views'))
app.set('view engine', 'ejs')

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Rutas
import indexRouter from './routes/index.routes.js'
import bookRouter from './routes/book.js'

app.use(indexRouter)
app.use(bookRouter)
// app.use(require('./routes/user'))

// Estaticos
app.use(express.static(path.join(process.cwd(), 'src/web/public')))
app.use('/libro', express.static(path.join(process.cwd(), 'src/web/public')))

// Iniciar servidor
app.listen(port, () => {
    console.log('Servidor encendido')
})