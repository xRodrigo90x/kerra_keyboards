import { create, deleteById, update } from "../controllers/productos.controllers.js";
import middlewareUpload from "../middlewares/uploadImage.middleware.js";
import * as admin from "../middlewares/admin.middlewares.js"
import authController from "../middlewares/auth.middlewares.js"

import { Router } from "express";


const router = Router();


router.post('/producto', authController.verifyToken, admin.verificar, middlewareUpload.uploadImage, create);
router.delete('/producto/:id', authController.verifyToken, admin.verificar, middlewareUpload.uploadImage, create);
router.put('/producto', authController.verifyToken, admin.verificar, middlewareUpload.uploadImage, create);




export default router;