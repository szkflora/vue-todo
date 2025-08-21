import { Request, Response } from 'express';
import * as services from '../services/taskService';

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
    await services.createTask(req.body.title, req.body.description, req.body.importance, req.body.date);
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function updateTaskImportance(req: Request, res: Response) {
  try {
    const { _id } = req.params;
    await services.updateTaskImportance(_id, req.body.importance);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function updateTaskState(req: Request, res: Response) {
  try {
    const { _id } = req.params;
    await services.updateTaskState(_id, req.body.completed);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function updateTaskText(req: Request, res: Response) {
  try {
    const { _id } = req.params;
    await services.updateTaskText(_id, req.body.title, req.body.description);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function deleteTask(req: Request, res: Response) {
  try {
    const { _id } = req.params;
    await services.deleteTask(_id);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
}