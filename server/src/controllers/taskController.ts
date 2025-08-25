import { Request, Response } from 'express';
import * as services from '../services/taskService';
import { Importance } from '../models/Task';
import mongoose from 'mongoose';

export async function getTasks(req: Request, res: Response) {
  try {
    const tasks = await services.getTasks();
    res.json(tasks);
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function createTask(req: Request, res: Response) {
  try {
    if(!req.body.title || !Object.values(Importance).includes(req.body.importance)) {
      return res.sendStatus(400);
    }

    const parsedDate = new Date(req.body.dueDate);
    if (isNaN(parsedDate.getTime())) {
      return res.sendStatus(400);
    }

    await services.createTask(req.body.title, req.body.description, req.body.importance, req.body.dueDate);
    return res.sendStatus(201);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function updateTaskImportance(req: Request, res: Response) {
  try {
    const { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id) || !Object.values(Importance).includes(req.body.importance)) {
      return res.sendStatus(400);
    }
    await services.updateTaskImportance(_id, req.body.importance);
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function updateTaskState(req: Request, res: Response) {
  try {
    const { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id) || typeof req.body.completed !== 'boolean') {
      return res.sendStatus(400);
    }
    await services.updateTaskState(_id, req.body.completed);
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function updateTaskText(req: Request, res: Response) {
  try {
    const { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.sendStatus(400);
    }
    await services.updateTaskText(_id, req.body.title, req.body.description);
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function deleteTask(req: Request, res: Response) {
  try {
    const { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.sendStatus(400);
    }
    await services.deleteTask(_id);
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
}