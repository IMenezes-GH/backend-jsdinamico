import { Router } from "express";
import {getUsers, createUser, updateUser, deleteUser} from "../controllers/usersController.js";

const router = Router();
router.route('/')
            .get(getUsers)
            .post(createUser)
            .patch(updateUser)
            .delete(deleteUser)

router.route('/:username')
            .get(getUsers)


export {router};