import { Router } from "express"
const userRouter = new Router()

import UserController from "../controllers/user.controller.js"

userRouter.post('/usuario/logear', async (req, res) => { UserController.login(req, res) })

userRouter.post('/usuario/crear', async (req, res) => { UserController.register(req, res) })

userRouter.post('/favorito/:libroId/agregar', async (req, res) => { UserController.añadirFavorito(req, res) })

export default userRouter