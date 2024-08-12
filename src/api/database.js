const mysql = require('mysql2/promise.js')

const { databaseConfig } = require('../config.json') // Configuracion para conectarse a la base de datos

async function connect() {
    const db = await mysql.createConnection({
        user: 'root',
        database: 'gestion_turnos',
        password: '',
        port: 3306,
        host: 'localhost'
    })
    
    db.connect(err => { 
        if(err) throw new err
        console.log('Base de datos conectada')
    })

    return db
}

module.exports = connect 