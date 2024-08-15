export const isAdmin = (req, res, next) => {
    if(req.session.role == 'admin') {
        next()
    } else {
        res.redirect('/login')
    }
}