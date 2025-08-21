import { Router } from 'express'
import { getTasks, createTask, updateTaskImportance, updateTaskState } from '../controllers/taskController'
const router = Router();

router.get("/", getTasks);

router.post("/", createTask);

router.put("/:_id/importance", updateTaskImportance);

router.put("/:_id/completed", updateTaskState);

export default router;