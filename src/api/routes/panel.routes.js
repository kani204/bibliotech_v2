import { Router } from 'express'
const panelRouter = Router()

import { isAdmin } from '../middlewares/auth.js'

import PanelController from '../controllers/panel.controller.js'

panelRouter.get('/panel', (req, res) => {
    const { username, role } = req.session

    res.render('panel', { title: 'Panel', user: { username, role } })
})

panelRouter.get('/panel/libros', async (req, res) => { PanelController.getAll(req, res) })

panelRouter.get('/panel/libros/:id/editar', async (req, res) => { PanelController.editById(req, res) })

panelRouter.get('/panel/libros/agregar', (req, res) => {
    const { username, role } = req.session

    res.render('admin/añadirLibro', { title: 'Panel - Libros', username, role })
})

panelRouter.get('/panel/usuarios', (req, res) => {
    const { username, role } = req.session

    res.render('admin/usuariosPanel', { title: 'Panel - Usuarios', username, role })
})

panelRouter.get('/panel/categorias', (req, res) => {
    const { username, role } = req.session

    res.render('admin/categoriasPanel', { title: 'Panel - Categorias', username, role })
})

export default panelRouter