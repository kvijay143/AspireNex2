import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Quiz = ({ quizId }) => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/quiz/${quizId}`);
        setQuiz(response.data);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleAnswerChange = (questionId, optionIndex) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleClearResponse = (questionId) => {
    setAnswers(prev => {
      const updatedAnswers = { ...prev };
      delete updatedAnswers[questionId];
      return updatedAnswers;
    });
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(prev => prev - 1);
  };

  const handleSubmit = () => {
    let score = 0;
    quiz.questions.forEach(question => {
      if (answers[question._id] === question.correctOption) {
        score++;
      }
    });
    setScore(score);

    // Determine feedback
    if (score === quiz.questions.length) {
      setFeedback('Excellent! You answered all questions correctly.');
    } else if (score >= quiz.questions.length / 2) {
      setFeedback('Good effort! You answered some questions correctly.');
    } else {
      setFeedback('Keep practicing! You can improve.');
    }

    // Redirect after a short delay
    setTimeout(() => {
      navigate(`/`);
    }, 3000); // Redirect after 3 seconds
  };

  if (!quiz) {
    return <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
      <h2 className="text-3xl font-semibold mb-4">{quiz.title}</h2>
      <p className="mb-4">{quiz.description}</p>
      <div className="max-w-md w-full p-4 rounded-lg shadow-lg">
        <h4 className="text-lg font-semibold mb-2">{currentQuestion.questionText}</h4>
        {currentQuestion.options.map((option, index) => (
          <label key={option._id} className="block my-2">
            <input
              type="radio"
              name={currentQuestion._id}
              value={index}
              checked={answers[currentQuestion._id] === index}
              onChange={() => handleAnswerChange(currentQuestion._id, index)}
              className="mr-2"
            />
            <span>{option.text}</span>
          </label>
        ))}
        <div className="flex justify-between mt-4">
          {!isFirstQuestion && (
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded focus:outline-none"
              onClick={handlePreviousQuestion}
            >
              Previous
            </button>
          )}
          {isLastQuestion ? (
            <button
              className="mt-4 bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none"
              onClick={handleSubmit}
            >
              Submit
            </button>
          ) : (
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none"
              onClick={handleNextQuestion}
            >
              Next Question
            </button>
          )}
        </div>
        {score !== null && (
          <div className="mt-4">
            <p className="font-semibold">Your score is: {score}/{quiz.questions.length}</p>
            <p className="mt-2">{feedback}</p>
          </div>
        )}
        {answers[currentQuestion._id] !== undefined && (
          <button
            className="mt-2 text-sm text-gray-400 underline focus:outline-none"
            onClick={() => handleClearResponse(currentQuestion._id)}
          >
            Clear Response
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
