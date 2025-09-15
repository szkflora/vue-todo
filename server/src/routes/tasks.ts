import { Router } from 'express'
import { getTasks, createTask, updateTaskImportance, updateTaskState, updateTaskText, deleteTask, getTaskCount } from '@/controllers/taskController'
import { verifyToken } from '@/middleware/authMiddleware';
const router = Router();

router.get("/", verifyToken, getTasks);

router.post("/", verifyToken, createTask);

router.get("/count", verifyToken, getTaskCount);

router.put("/:_id/importance", verifyToken, updateTaskImportance);

router.put("/:_id/completed", verifyToken, updateTaskState);

router.put("/:_id/text", verifyToken, updateTaskText);

router.delete("/:_id", verifyToken, deleteTask);

export default router;