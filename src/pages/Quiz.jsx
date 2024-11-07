import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import './Quiz.css';

const Quiz = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quizDoc = await getDoc(doc(db, 'quizzes', quizId));
        if (quizDoc.exists()) {
          setQuiz(quizDoc.data());
        } else {
          console.error("Quiz not found");
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleOptionChange = (questionIndex, option) => {
    setUserAnswers({ ...userAnswers, [questionIndex]: option });
  };

  const handleSubmit = () => {
    let scoreCount = 0;
    quiz.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        scoreCount++;
      }
    });
    setScore(scoreCount);
  };

  if (!quiz) return <p>Loading...</p>;

  return (
    <div className="quiz-container">
      <video autoPlay loop muted className="background-video">
        <source src="/backround.mp4" type="video/mp4" />
      </video>
      
      <div className="quiz-content">
        <h1 className="quiz-title">{quiz.title}</h1>

        {score === null ? (
          <>
            {quiz.questions.map((question, index) => (
              <div key={index} className="question-block">
                <p className="question-text">{question.questionText}</p>
                <div className="options-container">
                  {Object.entries(question.options).map(([key, value]) => (
                    <label key={key} className="option-label">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={key}
                        checked={userAnswers[index] === key}
                        onChange={() => handleOptionChange(index, key)}
                        className="option-input"
                      />
                      <span className="option-text">{value}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={handleSubmit} className="submit-button">
              Submit Quiz
            </button>
          </>
        ) : (
          <div className="result-container">
            <p className="score-text">Score: {score} / {quiz.questions.length}</p>
            <button onClick={() => navigate('/')} className="back-button">
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
