import usuarioController from "../controllers/usuarios.controllers.js";
import authController from "../middlewares/auth.middlewares.js"
import * as admin from "../middlewares/admin.middlewares.js"
import { Router } from "express";


const router = Router();


router.post('/registro', usuarioController.crearUsuario)
router.get('/verificarRegistro/:token', usuarioController.verificarRegistro)
router.post('/login', authController.emitToken, usuarioController.login)
router.get('/', authController.verifyToken, admin.verificar, usuarioController.buscarUsuario)




export default router;