const { Router } = require('express')
const userRouter = new Router()

const db = mysql.createConnection({
    user: 'root',
    database: 'bibliotech_v2',
    password: '',
    port: 3306,
    host: 'localhost'
})

db.connect(err => { 
    if(err) throw new err
})

userRouter.post('/user/create', (req, res) => {
    const { nombre, contraseña, correoElectronico } = req.body

    const sql = "INSERT INTO usuarios (Nombre, CorreoElectronico, Contrasenia) VALUES (?, ?, ?);"

    try {
        db.query(sql, [nombre, correoElectronico, contraseña])
        res.status(200).send('created')
    } catch(err) {
        res.status(404).send(err)
    }
})

userRoutes.post('/user/delete', (req, res) => {
    const { id } = req.body

    const sql = "DELETE FROM usuarios WHERE UsuarioID = ?"

    try {
        db.query(sql, [id])
        res.status(200).send('deleted')
    } catch(err) {
        res.status(404).send(err)
    }
})

module.exports = userRouter