import { Router } from 'express'
import { getTasks, createTask, updateTaskImportance, updateTaskState, updateTaskText, deleteTask } from '@/controllers/taskController'
import { verifyToken } from '@/middleware/authMiddleware';
const router = Router();

router.get("/", verifyToken, getTasks);

router.post("/", verifyToken, createTask);

router.put("/:_id/importance", updateTaskImportance);

router.put("/:_id/completed", updateTaskState);

router.put("/:_id/text", updateTaskText);

router.delete("/:_id", deleteTask);

export default router;