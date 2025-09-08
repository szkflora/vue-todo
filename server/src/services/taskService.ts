import { Task, Importance } from '../models/Task';

export async function getTasks(userId: string, keyword: string) {
  let res;
  if (keyword !== '') {
    res = await Task.find({
      userId: userId,
      $or: [{ title: { $regex: keyword, $options: 'i' } }, { description: { $regex: keyword, $options: 'i' } }],
    }).sort({
      creationDate: -1,
    });
  } else {
    res = await Task.find({ userId: userId }).sort({ creationDate: -1 });
  }
  return res;
}

export async function createTask(
  title: string,
  description: string,
  importance: Importance,
  date: Date,
  userId: string,
) {
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