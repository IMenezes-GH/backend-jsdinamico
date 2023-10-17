import { Router } from "express";
import {getUsers, createUser} from "../controllers/usersController.js";

const router = Router();
router.route('/')
            .get(getUsers)
            .post(createUser)

export {router};