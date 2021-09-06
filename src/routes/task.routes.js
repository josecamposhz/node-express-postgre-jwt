import { Router } from 'express';
import TaskService from '../services/task.service';
import verifyAuth from '../middlewares/verifyAuth';

const router = Router();

router.get('/', async (req, res) => {
  const { data, status } = await TaskService.getTasks();
  res.send(data).status(status);
});

router.get('/auth-user', verifyAuth, async (req, res) => {
  const { data, status } = await TaskService.getUserTasks(req.user.id);
  res.send(data).status(status);
});

router.post('/', verifyAuth, async (req, res) => {
  const { data, status } = await TaskService.createTask(req.body, req.user.id);
  res.send(data).status(status);
});

router.put('/:id', verifyAuth, async (req, res) => {
  const { data, status } = await TaskService.updateTask(req.body, req.params.id);
  res.send(data).status(status);
});

router.delete('/:id', verifyAuth, async (req, res) => {
  const { data, status } = await TaskService.deleteTask(req.params.id);
  res.send(data).status(status);
});

export default router;
