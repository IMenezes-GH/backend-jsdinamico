import { Router } from "express";
import { login } from "../controllers/authController.js";

const router = Router();

router.route('/').post(login);

export {router}