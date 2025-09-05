import { Response } from 'express';
import * as services from '@/services/taskService';
import { AuthRequest } from '@/middleware/authMiddleware';
import validate from 'validate.js';
import {
  createTaskConstraints,
  updateImportanceConstraints,
  updateStateConstraints,
  idConstraints,
} from '../validators/taskConstraints';

export async function getTasks(req: AuthRequest, res: Response) {
  try {
    const tasks = await services.getTasks(req.userId as string);
    res.status(200).json(tasks);
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function createTask(req: AuthRequest, res: Response) {
  try {
    const validationRes = validate({ ...{ userId: req.userId }, ...req.body }, createTaskConstraints);
    if (validationRes) {
      return res.status(400).json({ error: validationRes });
    }
    const task = await services.createTask(
      req.body.title,
      req.body.description,
      req.body.importance,
      req.body.dueDate,
      req.userId as string,
    );
    return res.status(201).json(task);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function updateTaskImportance(req: AuthRequest, res: Response) {
  try {
    const { _id } = req.params;
    console.log(_id);
    const validationRes = validate({ ...{ _id: _id }, ...req.body }, updateImportanceConstraints);
    if (validationRes) {
      return res.status(400).json({ error: validationRes });
    }
    await services.updateTaskImportance(_id, req.body.importance);
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function updateTaskState(req: AuthRequest, res: Response) {
  try {
    const { _id } = req.params;
    const validationRes = validate({ ...{ _id: _id }, ...req.body }, updateStateConstraints);
    if (validationRes) {
      return res.status(400).json({ error: validationRes });
    }
    await services.updateTaskState(_id, req.body.completed);
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function updateTaskText(req: AuthRequest, res: Response) {
  try {
    const { _id } = req.params;
    const validationRes = validate({ ...{ _id: _id }, ...req.body }, idConstraints);
    if (validationRes) {
      return res.status(400).json({ error: validationRes });
    }
    await services.updateTaskText(_id, req.body.title, req.body.description);
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function deleteTask(req: AuthRequest, res: Response) {
  try {
    const { _id } = req.params;
    const validationRes = validate({ ...{ _id: _id }, ...req.body }, idConstraints);
    if (validationRes) {
      return res.status(400).json({ error: validationRes });
    }
    await services.deleteTask(_id);
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
}
