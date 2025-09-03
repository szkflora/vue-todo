import { Task, Importance } from '@/models/Task';

export async function getTasks(userId: string) {
  return await Task.find({userId: userId}).sort({ creationDate: -1});
}

export async function createTask(title: string, description: string, importance: Importance, date: Date, userId: string) {
  const newTask = new Task({
    title: title,
    description: description,
    importance: importance,
    dueDate: date,
    completed: false,
    userId: userId,
  });
  await newTask.save();
  return newTask;
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