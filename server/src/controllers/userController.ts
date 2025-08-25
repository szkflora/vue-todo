import { Request, Response } from 'express';
import * as services from '../services/userService';
import bcrypt from 'bcrypt'

export async function addUser(req: Request, res: Response) {
  try {
    const pattern = /^[a-zA-Z0-9._]+@[a-z0-9]+\.[a-z]+$/;
    if (!req.body.email.match(pattern)) {
      return res.sendStatus(400);
    }
    const userWithSameEmail = await services.getUserByEmail(req.body.email);
    console.log(userWithSameEmail);
    if (userWithSameEmail !== undefined) {
      return res.sendStatus(400);
    }
    const hashedPsw = await bcrypt.hash(req.body.password, 10);
    await services.addUser(req.body.firstName, req.body.lastName, req.body.email, hashedPsw);
    return res.sendStatus(201);
  } catch (err) {
    return res.sendStatus(500);
  }
}
