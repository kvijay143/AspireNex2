import React, { useState } from 'react';
import QuizList from './QuizList';
import Quiz from './Quiz'; // Adjusted import to match your file name and component

const QuizApp = () => {
  const [selectedQuizId, setSelectedQuizId] = useState(null);

  const handleSelectQuiz = (quizId) => {
    setSelectedQuizId(quizId);
    // Pass the selected quiz ID up to App.jsx if needed
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
      <div className="max-w-xl w-full p-4 rounded-lg shadow-lg">
        {!selectedQuizId ? (
          <QuizList onSelectQuiz={handleSelectQuiz} />
        ) : (
          <Quiz quizId={selectedQuizId} />  
        )}
      </div>
    </div>
  );
};

export default QuizApp;
