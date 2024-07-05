import express from 'express';
import { signin, signup, user } from '../controllers/auth.controller.js';
const router=express.Router();

router.post('/signin',signin);
router.post('/signup',signup);
router.get('/user',user);

export default router;