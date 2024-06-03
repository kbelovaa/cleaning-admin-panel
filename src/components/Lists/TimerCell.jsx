import React, { useEffect, useState } from 'react';
import { calculateTimeLeft } from '../../utils/formatDate';

const formatTime = (num) => (num < 10 ? `0${num}` : num);

const TimerCell = ({ cell }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(cell.getValue()));

  useEffect(() => {
    const timer = setInterval(() => {
      const timeLeft = calculateTimeLeft(cell.getValue());
      setTimeLeft(timeLeft);

      if (!timeLeft) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`status-wrapper ${timeLeft ? 'Active' : 'Expired'}`}>
      {timeLeft ? `${formatTime(timeLeft.minutes)}:${formatTime(timeLeft.seconds)}` : 'Expired'}
    </div>
  );
};

export default TimerCell;
