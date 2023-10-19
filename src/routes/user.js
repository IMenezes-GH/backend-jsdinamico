import { Router } from "express";
import {getUsers, createUser, updateUser, deleteUser} from "../controllers/usersController.js";
import JWTVerify from "../middleware/JWTVerify.js";

const router = Router();

router.route('/').post(createUser) // Rota para cadastro

router.use(JWTVerify);
router.route('/')
            .get(getUsers)
            .patch(updateUser)
            .delete(deleteUser)

router.route('/:username')
            .get(getUsers)


export {router};