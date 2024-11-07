import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import './CreateQuiz.css';

const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [quizId, setQuizId] = useState(null);
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    const newQuestion = {
      questionText,
      options: { A: optionA, B: optionB, C: optionC, D: optionD },
      correctAnswer,
    };
    setQuestions([...questions, newQuestion]);
    setQuestionText('');
    setOptionA('');
    setOptionB('');
    setOptionC('');
    setOptionD('');
    setCorrectAnswer('');
  };

  const handleSaveQuiz = async () => {
    try {
      const quizData = { title, questions };
      const docRef = await addDoc(collection(db, 'quizzes'), quizData);
      setQuizId(docRef.id);
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="create-quiz-container">
      <video autoPlay loop muted className="background-video">
        <source src="/backround.mp4" type="video/mp4" />
      </video>

      <div className="content-container">
        <h1 className="title">Create Quiz</h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Quiz Title"
          className="input-field"
        />

        <div className="question-section">
          <h2 className="section-title">Add a Question</h2>
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Question"
            className="input-field"
          />
          <input
            type="text"
            value={optionA}
            onChange={(e) => setOptionA(e.target.value)}
            placeholder="Option A"
            className="input-field"
          />
          <input
            type="text"
            value={optionB}
            onChange={(e) => setOptionB(e.target.value)}
            placeholder="Option B"
            className="input-field"
          />
          <input
            type="text"
            value={optionC}
            onChange={(e) => setOptionC(e.target.value)}
            placeholder="Option C"
            className="input-field"
          />
          <input
            type="text"
            value={optionD}
            onChange={(e) => setOptionD(e.target.value)}
            placeholder="Option D"
            className="input-field"
          />

          <div className="radio-group">
            <span>Select Correct Answer:</span>
            {['A', 'B', 'C', 'D'].map((option) => (
              <label key={option} className="radio-label">
                <input
                  type="radio"
                  name="correctAnswer"
                  value={option}
                  checked={correctAnswer === option}
                  onChange={() => setCorrectAnswer(option)}
                />
                {option}
              </label>
            ))}
          </div>

          <button onClick={handleAddQuestion} className="button-primary">Add Question</button>
        </div>

        <button onClick={handleSaveQuiz} className="button-secondary">Save Quiz</button>
        <button onClick={handleBackToHome} className="button-back">Back to Home</button>

        {quizId && (
          <div className="quiz-id-section">
            <p>Quiz created! Share this ID:</p>
            <p className="quiz-id">{quizId}</p>
            <p>
              Or share this link: <a href={`/quiz/${quizId}`} className="quiz-link">Take the Quiz</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateQuiz;
