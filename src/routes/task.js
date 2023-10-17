import { Router } from "express";

import { createTask, getTasks } from "../controllers/taskController.js";

const router = Router();

router.route('/:username/tasks')
        .get(getTasks)
        .post(createTask);

export {router};