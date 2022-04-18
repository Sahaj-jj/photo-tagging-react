import React, { useEffect, useState } from 'react';
import './Timer.css';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  const getFormattedTime = (totalSeconds) => {
    const secondsValue = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
    const minutesValue = Math.floor((totalSeconds % (60 * 60)) / 60).toString().padStart(2, '0');
    const hoursValue = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60)).toString().padStart(2, '0');
    return (`${hoursValue}:${minutesValue}:${secondsValue}`);
  };

  useEffect(() => {
    setTimeout(() => {
      setSeconds(seconds + 1);
    }, 1000);
  });

  return (
    <div className="timer">
      {getFormattedTime(seconds)}
    </div>
  );
}

export default Timer;
