export const isAdmin = (req, res, next) => {
    if(req.session.role == 'admin') {
        next()
    } else {
        res.redirect('/login')
    }
}

export const isLogged = (req, res, next) => {
    if(req.session.username == '' || typeof req.session.username == 'undefined') {
        res.redirect('/login')
    } else {
        next()
    }
}