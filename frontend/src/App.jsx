import React, { useState, useEffect } from "react";
import FocusTimer from "./components/FocusTimer";
import TaskManagement from "./components/TaskManagement";
import DistractionBlocker from "./components/DistractionBlocker";
import MeditationSession from "./components/MeditationSession";
import SubmitFeedback from "./components/SubmitFeedback";
import "./styles.css";

function App() {
  const [isMeditation, setIsMeditation] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const startMeditation = () => {
    setIsMeditation(true);
  };

  const endMeditation = () => {
    setIsMeditation(false);
  };

  const handleToggleFeedback = () => {
    setShowFeedback((prevState) => !prevState);
  };

  function FocusTimer({ startMeditation }) {
    const [duration, setDuration] = useState(25);
    const [timeLeft, setTimeLeft] = useState(duration * 60);
    const [isActive, setIsActive] = useState(false);

    const radius = 100;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
      setTimeLeft(duration * 60);
    }, [duration]);

    useEffect(() => {
      let timer = null;
      if (isActive && timeLeft > 0) {
        timer = setInterval(() => {
          setTimeLeft((prev) => prev - 1);
        }, 1000);
      } else if (timeLeft === 0 && isActive) {
        setIsActive(false);
        startMeditation();
      }
      return () => clearInterval(timer);
    }, [isActive, timeLeft, startMeditation]);

    const startTimer = () => {
      setIsActive(true);
    };

    const resetTimer = () => {
      setIsActive(false);
      setTimeLeft(duration * 60);
    };

    const progress = timeLeft / (duration * 60);
    const offset = circumference - progress * circumference;

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
      <div className="focus-timer">
        <h2>Focus Timer</h2>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          placeholder="Focus Duration (minutes)"
          min="1"
        />
        <div className="timer-container">
          <svg width="220" height="220">
            <circle
              className="progress-ring__background"
              stroke="#2E8B57"
              strokeWidth="10"
              fill="transparent"
              r="100"
              cx="110"
              cy="110"
            />
            <circle
              className="progress-ring__circle"
              stroke="#2E8B57"
              strokeWidth="10"
              fill="transparent"
              r="100"
              cx="110"
              cy="110"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize="2em"
              fill="#2E8B57"
            >
              {`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
            </text>
          </svg>
          <div className="buttons">
            <button onClick={startTimer}>Start</button>
            <button onClick={resetTimer}>Reset</button>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      <div className="top-right-buttons">
        <button onClick={() => setDarkMode(!darkMode)} className="button">
          {darkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
        </button>
        <button onClick={handleToggleFeedback} className="button">
          {showFeedback ? "Back to App" : "Submit Feedback"}
        </button>
      </div>
      <h1>ClearSpace</h1>
      {showFeedback ? (
        <SubmitFeedback onSurveyComplete={handleToggleFeedback} />
      ) : isMeditation ? (
        <MeditationSession endMeditation={endMeditation} />
      ) : (
        <div className="container">
          <div className="left-side">
            <TaskManagement />
          </div>
          <div className="center">
            <FocusTimer startMeditation={startMeditation} />
          </div>
          <div className="right-side">
            <DistractionBlocker />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;