import { Router } from "express";

import { getTasks } from "../controllers/taskController.js";

const router = Router();

router.route('/')
        .get(getTasks);

export {router};