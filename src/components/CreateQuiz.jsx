import React, { useState } from 'react';
import axios from 'axios';

const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([{ questionText: '', options: [{ text: '' }, { text: '' }, { text: '' }, { text: '' }], correctOption: 0 }]);

  const handleQuestionChange = (index, key, value) => {
    const newQuestions = [...questions];
    newQuestions[index][key] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex].text = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', options: [{ text: '' }, { text: '' }, { text: '' }, { text: '' }], correctOption: 0 }]);
  };

  const deleteQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/quiz/create', {
        title,
        description,
        questions,
      });
      alert('Quiz created successfully!');
      setTitle('');
      setDescription('');
      setQuestions([{ questionText: '', options: [{ text: '' }, { text: '' }, { text: '' }, { text: '' }], correctOption: 0 }]);
    } catch (error) {
      console.error(error);
      alert('Failed to create quiz');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">Create a New Quiz</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          {questions.map((question, qIndex) => (
            <div key={qIndex} className="mb-4">
              <label className="block text-sm font-medium mb-2">Question {qIndex + 1}:</label>
              <input
                type="text"
                value={question.questionText}
                onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
                required
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 mb-4"
              />
              <div>
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="mb-2">
                    <label className="block text-sm font-medium mb-1">Option {oIndex + 1}:</label>
                    <input
                      type="text"
                      value={option.text}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                      required
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                ))}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Correct Option:</label>
                <select
                  value={question.correctOption}
                  onChange={(e) => handleQuestionChange(qIndex, 'correctOption', parseInt(e.target.value))}
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  {question.options.map((_, oIndex) => (
                    <option key={oIndex} value={oIndex}>
                      Option {oIndex + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between items-center mb-4">
                <button 
               disabled={questions.length === 1}

                  type="button"
                  onClick={() => deleteQuestion(qIndex)}
                className={`bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg w-1/4 
                  ${questions.length === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Delete Question
                </button>
                {qIndex === questions.length - 1 && (
                  <button
                    type="button"
                    onClick={addQuestion}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-1/4"
                  >
                    Add Question
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Create Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;
