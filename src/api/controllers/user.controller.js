import UserModel from "../models/user.model.js"

class UserController {
    static async register(req, res) {
        const { username, password, email } = req.body

        try {
            await UserModel.register({ username, password, email })
            res.status(200).redirect('/login')
        } catch(err) {
            res.status(404).render('error')
        }
    }

    static async login(req, res) {
        const { email, password } = req.body

        try {
            const result = await UserModel.login({ password, email })
        
            if(result == 'invalid_password' || result == 'user_not_exist') return res.redirect('/login')

            req.session.username = result[0].username
            req.session.role = result[0].role

            res.status(200).redirect('/')
        } catch(err) {
            res.status(404).render('error')
        }
    }
}

export default UserController