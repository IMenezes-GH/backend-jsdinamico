import { Router } from "express";

import { createTask, deleteTask, getTasks, updateTask } from "../controllers/taskController.js";

const router = Router();

router.route('/:username/tasks')
        .get(getTasks)
        .post(createTask)
        .patch(updateTask)
        .delete(deleteTask);

export {router};