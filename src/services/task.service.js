import schemaValidate from '../helpers/joi';
import ResponseHttp from '../helpers/ResponseHttp';
import { schemaTask } from '../helpers/joi/schemas';
import TaskRepository from '../repositories/task.repository';

async function createTask(body, userId) {
  try {
    const { error } = schemaValidate(schemaTask, body);
    if (error) return ResponseHttp({ error }, 400);

    const newTask = await TaskRepository.create({
      description: body.description,
      done: body.done,
      userId,
    });

    return ResponseHttp({ message: 'New Task created' }, 200);
  } catch (error) {
    return ResponseHttp({ error }, 400);
  }
}

async function getTasks() {
  const tasks = await TaskRepository.getAll();
  return ResponseHttp(tasks, 200);
}

async function getUserTasks(userId) {
  const tasks = await TaskRepository.getUserTasks(userId);
  return ResponseHttp(tasks, 200);
}

async function updateTask(body, taskId) {
  try {
    const { error } = schemaValidate(schemaTask, body);
    if (error) return ResponseHttp({ error }, 400);

    const updatedTask = await TaskRepository.update(
      {
        description: body.description,
        done: body.done
      },
      taskId
    );
    return ResponseHttp({ message: 'Task Updated' }, 200);
  } catch (error) {
    return ResponseHttp({ error }, 400);
  }
}

async function deleteTask(id) {
  try {
    const taskDeleted = await TaskRepository.destroy(id);
    return ResponseHttp({ message: 'Task Deleted' }, 200);
  } catch (e) {
    return ResponseHttp({ error }, 400);
  }
}

export default {
  getTasks,
  getUserTasks,
  createTask,
  updateTask,
  deleteTask,
};
