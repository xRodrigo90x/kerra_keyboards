import { Router } from "express";
import * as controllers from "../controllers/views.controllers.js"

const router = Router();

router.get(['/', "/home"], controllers.home);


export default router;