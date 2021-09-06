import { Router } from 'express';
const router = Router();

import AuthService from '../services/auth.service';

router.post('/register', async (req, res) => {
  const { data, status } = await AuthService.register(req.body);
  res.send(data).status(status);
});
router.post('/login', async (req, res) => {
  const { data, status } = await AuthService.login(req.body);
  res.send(data).status(status);
});
// router.post("/forgot-password", AuthService.forgotPassword);
// router.post("/reset-password", AuthService.resetPassword);
// router.post("/verify-email", AuthService.verifyEmail);
// router.put('/profile/:id', verifyAuth(), AuthService.updateProfile);
// router.put('/password/:id', verifyAuth(), AuthService.updatePassword);
// router.post("/avatar/:id", verifyAuth(), AuthService.updateAvatar);

export default router;
