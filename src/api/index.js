import express from 'express'
import path from 'node:path'
import session from 'express-session'
import multer from 'multer'
import { randomUUID } from 'node:crypto'

const app = express()

// Config
const port = process.env.PORT || 3000
app.set('views', path.join(process.cwd(), 'src/web/views'))
app.set('view engine', 'ejs')

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(session({
    secret: 'keyboard cat', // CAMBIAR Y GUARDAR EN OTRO LADO MAS TARDE
    resave: true,
    saveUninitialized: true,
}))

const storage = multer.diskStorage({
    destination: path.join(process.cwd(), 'src/web/public/uploads'),
    filename: (req, file, cb, filename) => {
        console.log(file);
        cb(null, randomUUID() + path.extname(file.originalname));
    }
}) 
app.use(multer({ storage }).single('imagen'));

// Rutas
import indexRouter from './routes/index.routes.js'
import bookRouter from './routes/book.js'
import userRouter from './routes/user.routes.js'

app.use(indexRouter)
app.use(bookRouter)
app.use(userRouter)

// Estaticos
app.use(express.static(path.join(process.cwd(), 'src/web/public')))
app.use('/libro', express.static(path.join(process.cwd(), 'src/web/public')))
app.use('/libro/:id', express.static(path.join(process.cwd(), 'src/web/public')))



// Iniciar servidor
app.listen(port, () => {
    console.log('Servidor encendido')
})