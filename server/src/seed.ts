import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/User'
import { Task } from './models/Task'
import { Importance } from './models/Task';

dotenv.config({ path: __dirname + '/../.env' });

async function seed() {

  await mongoose.connect(process.env.atlas_URL as string);

  const user1 = new User({
    firstName: 'Anna',
    lastName: 'Nagy',
    email: 'annanagy@gmail.com',
    hashedPsw: 'asdfghjkl',
  });

  await user1.save();

  const task1 = new Task({
    title: 'Task1',
    description: 'must do it',
    importance: Importance.HIGH,
    date: new Date(),
    completed: false,
    userId: user1._id,
  });

  const task2 = new Task({
    title: 'Task2',
    importance: Importance.LOW,
    date: new Date(),
    completed: false,
    userId: user1._id,
  });

  await task1.save();
  await task2.save();

  mongoose.connection.close();

}

seed();