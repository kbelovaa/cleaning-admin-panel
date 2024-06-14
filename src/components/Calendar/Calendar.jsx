import React, { useState } from 'react';
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isToday,
  addDays,
  isSameMonth,
  addMonths,
} from 'date-fns';
import { weekdays } from '../../constants/tableColumns';
import './Calendar.scss';

const Calendar = ({ schedule }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInCalendar = () => {
    const start = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 });

    const calendarDays = [];
    let day = start;

    while (day <= end || calendarDays.length < 42) {
      calendarDays.push(day);
      day = addDays(day, 1);
    }

    return calendarDays;
  };

  const renderWorkingTimes = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const workingDay = schedule.find((day) => day.date.split('T')[0] === formattedDate);

    return workingDay ? (
      <div className="calendar__times">
        {workingDay.times.map((time, index) => (
          <span key={index} className="calendar__time">
            {time}
          </span>
        ))}
      </div>
    ) : null;
  };

  const setToday = () => {
    setCurrentDate(new Date());
  };

  const changeMonth = (direction) => {
    setCurrentDate((currentDate) => addMonths(currentDate, direction));
  };

  return (
    <div className="calendar">
      <div className="calendar__header">
        <div className="calendar__curr-date">
          <span className="calendar__month">{format(currentDate, 'MMMM')}</span>
          <span className="calendar__year">{format(currentDate, 'yyyy')}</span>
        </div>
        <div className="calendar__buttons">
          <svg
            className="calendar__arrow"
            onClick={() => changeMonth(-1)}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M21 12L3 12" stroke="#2329D6" strokeLinecap="round" />
            <path d="M9 6L3 12L9 18" stroke="#2329D6" strokeLinecap="round" />
          </svg>
          <span className="calendar__today link" onClick={setToday}>
            Today
          </span>
          <svg
            className="calendar__arrow"
            onClick={() => changeMonth(1)}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M3 12L21 12" stroke="#2329D6" strokeLinecap="round" />
            <path d="M15 18L21 12L15 6" stroke="#2329D6" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <div className="calendar__weekdays">
        {weekdays.map((weekday, index) => (
          <span key={index} className="calendar__weekday">
            {weekday}
          </span>
        ))}
      </div>
      <div className="calendar__days">
        {daysInCalendar().map((day, index) => (
          <div
            key={index}
            className={`calendar__day ${isToday(day) ? 'calendar__day_today' : ''} ${
              !isSameMonth(day, currentDate) ? 'calendar__day_other-month' : ''
            }`}
          >
            <span className="calendar__date">{format(day, 'd')}</span>
            {renderWorkingTimes(day)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
