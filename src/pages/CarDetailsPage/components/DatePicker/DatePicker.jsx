import { useState, useRef, useEffect } from "react";
import Calendar from "./Calendar";
import styles from "./DatePicker.module.css";

const DatePicker = ({ 
  value, 
  onChange, 
  error, 
  disabled, 
  placeholder = "Booking date*",
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const dateString = date.toISOString().split('T')[0];
    onChange(dateString);
    setIsOpen(false);
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div className={`${styles.container} ${className}`} ref={containerRef}>
      <div
        className={`${styles.input} ${error ? styles.inputError : ''} ${disabled ? styles.disabled : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={selectedDate ? styles.valueText : styles.placeholder}>
          {selectedDate ? formatDate(selectedDate) : placeholder}
        </span>
        <svg 
          className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}
          width="16" 
          height="16" 
          viewBox="0 0 16 16"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
      
      {isOpen && (
        <div className={styles.dropdown}>
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;