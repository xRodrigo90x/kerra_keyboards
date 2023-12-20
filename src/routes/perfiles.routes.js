import completarPerfil from "../controllers/perfiles.controllers.js"
import authController from "../middlewares/auth.middlewares.js"

import { Router } from "express";


const router = Router();


router.get('/registro/perfil', authController.verifyToken, completarPerfil)
router.post('/registro/perfil', authController.verifyToken, completarPerfil)


export default router;