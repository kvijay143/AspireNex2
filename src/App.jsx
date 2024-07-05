
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import CreateQuiz from './components/CreateQuiz';
import QuizApp from './components/QuizApp'; // Assuming this is where you manage quizzes
import Quiz from './components/Quiz'; // Assuming this is where you take individual quizzes
import React from 'react';

const App = () => {
   

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/view-quizzes" element={<QuizApp/>} />
        <Route path="/quiz/:id" element={<Quiz />} /> {/* Assuming this component will handle displaying the quiz and allowing the user to take it */}
      </Routes>
    </Router>
  );
};

export default App;
