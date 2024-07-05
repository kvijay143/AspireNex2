import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuizList = ({ onSelectQuiz }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/quiz/all');
        setQuizzes(response.data);
        setLoading(false); // Update loading state when data is fetched
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };
    fetchQuizzes();
  }, []);

  if (loading) {
    return <div className="text-white">Loading...</div>; // Display loading indicator while fetching data
  }

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg h-full">
      <h2 className="text-2xl font-semibold mb-4">Select a Quiz</h2>
      <ul className="divide-y divide-gray-800 overflow-auto">
        {quizzes.map((quiz) => (
          <li
            key={quiz._id}
            onClick={() => onSelectQuiz(quiz._id)}
            className="cursor-pointer py-3 hover:bg-gray-800 transition duration-300"
          >
            {quiz.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
