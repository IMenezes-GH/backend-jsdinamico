import { Router } from "express";

import { createTask, getTasks, updateTask } from "../controllers/taskController.js";

const router = Router();

router.route('/:username/tasks')
        .get(getTasks)
        .post(createTask)
        .patch(updateTask);

export {router};