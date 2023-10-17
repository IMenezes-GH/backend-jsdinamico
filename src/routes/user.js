import { Router } from "express";
import {getUsers} from "../controllers/usersController.js";

const router = Router();
router.route('/').get(getUsers)

export {router};