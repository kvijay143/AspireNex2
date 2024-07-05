import Quiz from "../models/quizmodel.js";
import { errorHandler } from "../utils/error.js";

export const createQuiz = async (req, res, next) => {
    const { title, description, questions } = req.body;

    if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
        return next(errorHandler(400, 'Title and questions are required'));
    }

    const newQuiz = new Quiz({
        title,
        description,
        questions,
       
    });

    try {
        await newQuiz.save();
        res.json('Quiz created successfully');
    } catch (error) {
        next(error);
    }
};

export const getAllQuizzes = async (req, res, next) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (error) {
        next(error);
    }
};
 export const displayQuiz= async (req, res, next) => {
    try {
      const quiz = await Quiz.findById(req.params.id);
      res.json(quiz);
    } catch (error) {
      next(error);
    }
  };
  
