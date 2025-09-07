import { Request, Response } from 'express';
import * as services from '../services/userService';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validate from 'validate.js';
import { addUserConstraints, signInConstraints } from '../validators/userConstraints';

export async function addUser(req: Request, res: Response) {
  try {
    const validationRes = validate(req.body, addUserConstraints);
    if (validationRes) {
      return res.status(400).json({ error: validationRes });
    }
    const userWithSameEmail = await services.getUserByEmail(req.body.email);
    if (userWithSameEmail !== null) {
      return res.status(400).json({ error: { email: 'This email address already belongs to an account' } });
    }
    const hashedPsw = await bcrypt.hash(req.body.password, 10);
    const user = await services.addUser(req.body.firstName, req.body.lastName, req.body.email, hashedPsw);
    const token = jwt.sign({ userId: user._id, firstName: user.firstName, lastName: user.lastName }, 'secret', {
      expiresIn: '2m',
    });
    return res.status(201).json({ token });
  } catch (err) {
    return res.status(500).json({ error: { server: 'Server error' } });
  }
}

export async function signIn(req: Request, res: Response) {
  try {
    const validationRes = validate(req.body, signInConstraints);
    if (validationRes) {
      return res.status(400).json({ error: validationRes });
    }
    const user = await services.getUserByEmail(req.body.email);
    if (user === null) {
      return res.status(400).json({ error: { email: 'We could not find an account with this email address' } });
    }
    const originalPsw = await services.getHashedPassword(req.body.email);
    const passwordMatch = await bcrypt.compare(req.body.password, originalPsw);
    if (!passwordMatch) {
      return res.status(401).json({ error: { password: 'Password is not correct' } });
    }
    const token = jwt.sign({ userId: user._id, firstName: user.firstName, lastName: user.lastName }, 'secret', {
      expiresIn: '2m',
    });
    res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ error: { server: 'Server error' } });
  }
}
