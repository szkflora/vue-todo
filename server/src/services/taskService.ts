import { Task, Importance } from '@/models/Task';

function getOrder(order: string): 1 | -1 | undefined {
  switch (order) {
    case 'ascending':
      return 1;
    case 'descending':
      return -1;
    default:
      return undefined;
  }
}

export async function getTaskCount(userId: string) {
  const count = await Task.countDocuments({ userId: userId });
  return count;
}

export async function getTasks(
  userId: string,
  keyword: string,
  title: string,
  description: string,
  importance: string,
  dueDate: string,
) {
  let res;
  const sort: any = { completed: 1 };

  const titleOrder = getOrder(title);
  if (titleOrder !== undefined) sort.title = titleOrder;

  const descriptionOrder = getOrder(description);
  if (descriptionOrder !== undefined) sort.description = descriptionOrder;

  const importanceOrder = getOrder(importance);
  if (importanceOrder !== undefined) sort.importance = importanceOrder;

  const dueDateOrder = getOrder(dueDate);
  if (dueDateOrder !== undefined) sort.dueDate = dueDateOrder;

  if (!sort.title && !sort.description && !sort.importance && !sort.dueDate) {
    sort.creationDate = -1;
  }

  if (keyword !== '') {
    res = await Task.find({
      userId: userId,
      $or: [{ title: { $regex: keyword, $options: 'i' } }, { description: { $regex: keyword, $options: 'i' } }],
    }).sort(sort);
  } else {
    res = await Task.find({ userId: userId }).sort(sort);
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
  try {
    await newTask.save();
  } catch (err: any) {
    console.error(err);
  }
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
