import { useState, useEffect } from 'react';

function FocusTimer({ startMeditation, autoStartMeditation }) {
  const [duration, setDuration] = useState(25);
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isActive, setIsActive] = useState(false);
  const [autoStart, setAutoStart] = useState(false);

  useEffect(() => {
    setTimeLeft(duration * 60);
  }, [duration]);

  useEffect(() => {
    let timer = null;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      startMeditation();
      if (autoStart) {
        setTimeout(() => {
          setIsActive(true);
          setTimeLeft(duration * 60);
        }, 1000);
      }
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, startMeditation, autoStart, duration]);

  const startTimer = () => {
    setIsActive(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(duration * 60);
  };

  return (
    <div className="focus-timer">
      <h2>Focus Timer</h2>
      <input
        type="number"
        min="1"
        value={duration}
        onChange={(e) => setDuration(parseInt(e.target.value))}
        placeholder="Focus Duration (minutes)"
      />
      <div className="timer-display">
        {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
      </div>
      <button onClick={startTimer}>Start</button>
      <button onClick={resetTimer}>Reset</button>
      <div>
        <input
          type="checkbox"
          id="autoStart"
          checked={autoStart}
          onChange={(e) => setAutoStart(e.target.checked)}
        />
        <label htmlFor="autoStart">Auto-start timer after meditation</label>
      </div>
    </div>
  );
}

export default FocusTimer;