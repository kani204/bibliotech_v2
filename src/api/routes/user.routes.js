import { Router } from "express"
const userRouter = new Router()

import UserController from "../controllers/user.controller.js"

userRouter.post('/usuario/logear', async (req, res) => { UserController.login(req, res) })

userRouter.post('/usuario/crear', async (req, res) => { UserController.register(req, res) })

userRouter.post('/favorito/:libroId/agregar', async (req, res) => { UserController.añadirFavorito(req, res) })
userRouter.post('/favorito/:libroId/eliminar', async (req, res) => { UserController.eliminarFavorito(req, res) })

userRouter.post('/gustado/:libroId/agregar', async (req, res) => { UserController.añadirGustado(req, res) })

userRouter.post('/seguido/:libroId/agregar', async (req, res) => { UserController.añadirSeguido(req, res) })

userRouter.post('/libro/:libroId/comentar', async (req, res) => { UserController.comentar(req, res) })

export default userRouter