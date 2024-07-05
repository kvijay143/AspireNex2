import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
    text: { type: String, required: true }
});

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: [optionSchema],
    correctOption: { type: Number, required: true } // index of the correct option in the options array
});

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    questions: [questionSchema],
 
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
