import express from 'express';
import { createQuiz, displayQuiz, getAllQuizzes } from '../controllers/quiz.controller.js';

const router = express.Router();

router.post('/create', createQuiz);
router.get('/all', getAllQuizzes);
router.get('/:id',displayQuiz);

export default router;
