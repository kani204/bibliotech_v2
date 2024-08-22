import connection from "../database.js"
import { hash, compare } from "bcrypt"

const SALT = 10

class UserModel {
    static async register({ username, password, email }) {
        const db = await connection()

        const hashedPassword = await hash(password, SALT)

        const sql = `INSERT INTO usuarios (Nombre, CorreoElectronico, Contrasenia) VALUES ('${username}', '${email}', '${hashedPassword}');`

        const result = await db.query(sql)

        return result
    }

    static async login({ password, email }) {
        const db = await connection()

        const [user] = await db.query(`SELECT r.NombreRol as role, u.Contrasenia as password, u.Nombre as username, u.UsuarioID as userId FROM usuarios u JOIN roles r ON u.RollID = r.RollID  WHERE u.CorreoElectronico = '${email}';`)
        if(user.length == 0) return 'user_not_exist'

        const validPassword = await compare(password, user[0].password)
        if(!validPassword) return 'invalid_password'

        return user
    }

    static async añadirFavorito({ userId, libroId }) {
        const db = await connection()

        const [verify] = await db.query(`SELECT * FROM favoritos WHERE UsuarioID = '${userId}' AND LibroID = '${libroId}';`)
        if(verify.length > 0) return 'duplicated'

        await db.query(`INSERT INTO favoritos (UsuarioID, LibroID) VALUES ('${userId}', '${libroId}');`)
    }
    
    static async añadirGustado({ userId, libroId }) {
        const db = await connection()

        const [verify] = await db.query(`SELECT * FROM gustados WHERE UsuarioID = '${userId}' AND LibroID = '${libroId}';`)
        if(verify.length > 0) return 'duplicated'

        await db.query(`INSERT INTO gustados (UsuarioID, LibroID) VALUES ('${userId}', '${libroId}');`)
    }

    static async añadirSeguido({ userId, libroId }) {
        const db = await connection()

        const [verify] = await db.query(`SELECT * FROM seguidos WHERE UsuarioID = '${userId}' AND LibroID = '${libroId}';`)
        if(verify.length > 0) return 'duplicated'

        await db.query(`INSERT INTO seguidos (UsuarioID, LibroID) VALUES ('${userId}', '${libroId}');`)
    }
}

export default UserModel