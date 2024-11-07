import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Home.css"
const Home = () => {
  const [quizId, setQuizId] = useState('');
  const navigate = useNavigate();

  const handleJoinQuiz = () => {
    if (quizId) {
      navigate(`/quiz/${quizId}`);
    }
  };

  return (
    <div className="home-container">
      {/* Video Background */}
      <video autoPlay loop muted className="video-background">
        <source src="/backround.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>  

      {/* Content Container */}
      <div className="content-container">
        <h1 className="title">Quizzify</h1>
        <input
          type="text"
          value={quizId}
          onChange={(e) => setQuizId(e.target.value)}
          placeholder="Enter Quiz ID"
          className="input-field"
        />
        <button onClick={handleJoinQuiz} className="btn-primary">Join Quiz</button>
        <button onClick={() => navigate('/create')} className="btn-secondary">Create Quiz</button>
      </div>
    </div>
  );
};

export default Home;
