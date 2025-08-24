import { Request, Response } from 'express';
import * as services from '../services/userService';
import bcrypt from 'bcrypt'

export async function addUser(req: Request, res: Response) {
  try {
    const hashedPsw = await bcrypt.hash(req.body.password, 10);
    await services.addUser(req.body.firstName, req.body.lastName, req.body.email, hashedPsw);
    return res.sendStatus(201);
  } catch (err) {
    return res.sendStatus(500);
  }
}
