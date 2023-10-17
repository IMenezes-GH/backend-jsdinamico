import { Router } from "express";
import {getUsers, createUser, updateUser} from "../controllers/usersController.js";

const router = Router();
router.route('/')
            .get(getUsers)
            .post(createUser)
            .patch(updateUser)

export {router};