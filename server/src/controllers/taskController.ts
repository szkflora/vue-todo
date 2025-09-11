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
import { Importance } from '../models/Task';

function mapImportance(importance: string): Importance {
  switch (importance) {
    case 'Low':
      return Importance.LOW;
    case 'Medium':
      return Importance.MEDIUM;
    default:
      return Importance.HIGH;
  }
}

export async function getTaskCount(req: AuthRequest, res: Response) {
  try {
    const userId = req.userId as string || '';
    const count = await services.getTaskCount(userId);
    res.status(200).json(count);
  } catch (err) {
    res.status(500).json({ error: { server: ['Server error'] } });
  }
}

export async function getTasks(req: AuthRequest, res: Response) {
  try {
    const query = req.query;
    const keyword = query.keyword;
    const tasks = await services.getTasks(
      req.userId as string,
      keyword as string,
      query.title as string,
      query.description as string,
      query.importance as string,
      query.dueDate as string,
    );
    res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json({ error: { server: ['Server error'] } });
  }
}

export async function createTask(req: AuthRequest, res: Response) {
  try {
    const validationRes = validate({ ...{ userId: req.userId }, ...req.body }, createTaskConstraints);
    if (validationRes) {
      return res.status(400).json({ error: validationRes });
    }
    const importance = mapImportance(req.body.importance);
    const task = await services.createTask(
      req.body.title,
      req.body.description,
      importance,
      req.body.dueDate,
      req.userId as string,
    );
    return res.status(201).json(task);
  } catch (err) {
    return res.status(500).json({ error: { server: ['Server error'] } });
  }
}

export async function updateTaskImportance(req: AuthRequest, res: Response) {
  try {
    const { _id } = req.params;
    const validationRes = validate({ ...{ _id: _id }, ...req.body }, updateImportanceConstraints);
    if (validationRes) {
      return res.status(400).json({ error: validationRes });
    }
    await services.updateTaskImportance(_id, mapImportance(req.body.importance));
    return res.status(200).json({ message: ['Task importance updated successfully'] });
  } catch (err) {
    return res.status(500).json({ error: { server: ['Server error'] } });
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
    return res.status(200).json({ message: ['Task state updated successfully'] });
  } catch (err) {
    return res.status(500).json({ error: { server: ['Server error'] } });
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
    return res.status(200).json({ message: ['Task text updated successfully'] });
  } catch (err) {
    return res.status(500).json({ error: { server: ['Server error'] } });
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
    return res.status(200).json({ message: ['Task deleted successfully'] });
  } catch (err) {
    return res.status(500).json({ error: { server: ['Server error'] } });
  }
}
