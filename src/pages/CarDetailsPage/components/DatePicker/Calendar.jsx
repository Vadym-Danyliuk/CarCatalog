import { useState } from "react";
import styles from "./Calendar.module.css";

const Calendar = ({ selectedDate, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
 
    const firstDay = new Date(year, month, 1);
   
    const lastDay = new Date(year, month + 1, 0);
    

    let firstDayOfWeek = firstDay.getDay();
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    const daysInMonth = lastDay.getDate();
    const days = [];
    

    const prevMonth = new Date(year, month - 1, 0);
    const prevMonthDays = prevMonth.getDate();
    
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: prevMonthDays - i,
        isCurrentMonth: false,
        isNextMonth: false,
        fullDate: new Date(year, month - 1, prevMonthDays - i)
      });
    }
    

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: day,
        isCurrentMonth: true,
        isNextMonth: false,
        fullDate: new Date(year, month, day)
      });
    }
    

    const remainingCells = 42 - days.length; 
    for (let day = 1; day <= remainingCells; day++) {
      days.push({
        date: day,
        isCurrentMonth: false,
        isNextMonth: true,
        fullDate: new Date(year, month + 1, day)
      });
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    if (!selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button
          className={styles.navButton}
          onClick={() => navigateMonth(-1)}
          type="button"
        >
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </button>
        
        <h3 className={styles.monthYear}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        
        <button
          className={styles.navButton}
          onClick={() => navigateMonth(1)}
          type="button"
        >
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path
              d="M6 4L10 8L6 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </button>
      </div>

      <div className={styles.weekdays}>
        {dayNames.map((day) => (
          <div key={day} className={styles.weekday}>
            {day}
          </div>
        ))}
      </div>

      <div className={styles.days}>
        {days.map((day, index) => (
          <button
            key={index}
            className={`
              ${styles.day}
              ${!day.isCurrentMonth ? styles.otherMonth : ''}
              ${isToday(day.fullDate) ? styles.today : ''}
              ${isSelected(day.fullDate) ? styles.selected : ''}
              ${isPastDate(day.fullDate) ? styles.disabled : ''}
            `}
            onClick={() => !isPastDate(day.fullDate) && onDateSelect(day.fullDate)}
            disabled={isPastDate(day.fullDate)}
            type="button"
          >
            {day.date}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;