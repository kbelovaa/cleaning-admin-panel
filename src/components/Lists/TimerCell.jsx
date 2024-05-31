import React, { useEffect, useState } from 'react';

function calculateTimeLeft(creationDate) {
  const endDate = new Date('2024-05-31T16:38:32+02:00');
  endDate.setMinutes(endDate.getMinutes() + 15);

  const difference = +endDate - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  } else {
    return null;
  }

  return timeLeft;
}

function formatTime(num) {
  return num < 10 ? `0${num}` : num;
}

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
