import { Date } from 'mongoose';
import { Task, Importance } from '../models/Task';
import mongoose from 'mongoose';

export async function getTasks() {
  return await Task.find();
}

export async function createTask(title: string, description: string, importance: Importance, date: Date) {
  const newTask = new Task({
    title: title,
    description: description,
    importance: importance,
    date: date,
    completed: false,
    userId: '68a339848eee20ff69c1841c',
  });
  await newTask.save();
}

export async function updateTaskImportance(id: string, importance: Importance) {
  await Task.updateOne({ _id: id }, { $set: { importance: importance } });
}

export async function updateTaskState(id: string, completed: boolean) {
  await Task.updateOne({ _id: id }, { $set: { completed: completed } });
}

export async function updateTaskText(id: string, title: string, description: string) {
  await Task.updateOne({ _id: id }, { $set: { title: title, description: description } });
}

export async function deleteTask(id: string) {
  await Task.deleteOne({ _id: id });
}