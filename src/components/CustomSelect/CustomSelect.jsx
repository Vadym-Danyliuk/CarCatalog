import { useState } from "react";
import styles from "./CustomSelect.module.css";

const CustomSelect = ({
  options,
  placeholder = "Choose a option",
  textBeforeValue,
  className = "",
  isError,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleClose = () => setIsOpen(false);

  const handleSelect = (option) => {
    setSelectedOption(option);
    handleClose();
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <div
      className={`${styles.wrapper} ${className}`}
      tabIndex={0}
      onBlur={handleClose}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
    >
      <div className={styles.select} onClick={handleToggle}>
        <span className={styles.value}>
          {textBeforeValue && selectedOption && <>{textBeforeValue}</>}
          {selectedOption || placeholder}
        </span>

        <svg
          width="16"
          height="16"
          className={`${styles.arrow} ${isOpen ? styles.open : ""}`}
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
        <div className={styles.options}>
          {isError && <p>Failed to load data. Please try again later.</p>}
          <ul className={styles.scrollBar} role="listbox">
            {options.map((option) => (
              <li
                key={option}
                role="option"
                aria-selected={selectedOption === option}
                className={`${styles.option} ${
                  selectedOption === option ? styles.selected : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
