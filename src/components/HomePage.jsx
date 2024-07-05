import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const goToCreateQuiz = () => {
    navigate('/create-quiz');
  };

  const goToViewQuizzes = () => {
    navigate('/view-quizzes');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-6xl font-semibold mb-12">Quiz Platform</h1>
      <div className="flex space-x-4">
        <button
          onClick={goToCreateQuiz}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg transition duration-300"
        >
          Create a Quiz
        </button>
        <button
          onClick={goToViewQuizzes}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg transition duration-300"
        >
          View Quizzes
        </button>
      </div>
    </div>
  );
};

export default HomePage;
