import { Router, Request, Response} from 'express'
import { Task } from '../models/Task';

const router = Router();

router.get("/", async(req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch(err) {
    res.sendStatus(500);
  }
});

export default router;