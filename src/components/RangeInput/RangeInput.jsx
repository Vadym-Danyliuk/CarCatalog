import { useState, useEffect } from "react";
import styles from "./RangeInput.module.css";

const formatThousandsSeparator = (value, separator = ",") => {
  return value.toLocaleString("en-US").replace(/,/g, separator);
};

const RangeInput = ({
  fromLabel = "From",
  toLabel = "To",
  initialFrom,
  initialTo,
  onChange,
}) => {
  const MIN_VALUE = 1;
  const MAX_VALUE = 999999;

  const [from, setFrom] = useState(
    initialFrom && initialFrom >= MIN_VALUE ? initialFrom : null
  );
  const [to, setTo] = useState(
    initialTo && initialTo >= MIN_VALUE ? initialTo : null
  );

  const [fromDisplay, setFromDisplay] = useState("");
  const [toDisplay, setToDisplay] = useState("");
  const [isError, setIsError] = useState("");

  const displayValue = (value) =>
    value !== null ? formatThousandsSeparator(value, ",") : "";

  useEffect(() => {
    setFromDisplay(displayValue(from));
  }, [from]);

  useEffect(() => {
    setToDisplay(displayValue(to));
  }, [to]);

  const handleChange = (e, type) => {
    const inputValue = e.target.value;

    if (!/^[\d,]*$/.test(inputValue)) return;

    const raw = inputValue.replace(/,/g, "");

    if (raw === "") {
      if (type === "from") {
        setFrom(null);
        setFromDisplay("");
        onChange?.({ from: null, to });
      } else {
        setTo(null);
        setToDisplay("");
        onChange?.({ from, to: null });
      }
      return;
    }

    if (!/^\d+$/.test(raw)) return;

    const numValue = Number(raw);
    if (numValue < MIN_VALUE || numValue > MAX_VALUE) return;

    if (type === "from") {
      setFrom(numValue);
      setFromDisplay(inputValue);
      onChange?.({ from: numValue, to });
    } else {
      setTo(numValue);
      setToDisplay(inputValue);
      onChange?.({ from, to: numValue });
    }
  };

  const handleBlur = (type) => {
    if (type === "from" && from && to && from >= to) {
      setIsError("The 'from' value must be less than the 'to' value");
    } else if (type === "to" && from && to && to <= from) {
      setIsError("The 'to' value must be greater than the 'from' value");
    } else {
      setIsError("");
    }
  };

  return (
    <div className={styles.wrapper}>
      <label
        className={`${styles.inputWrapper} ${isError ? styles.error : ""}`}
      >
        <span className={styles.label}>{fromLabel}</span>
        <input
          type="text"
          name="from"
          value={fromDisplay}
          onChange={(e) => handleChange(e, "from")}
          onBlur={() => handleBlur("from")}
          className={styles.input}
          inputMode="numeric"
          autoComplete="off"
        />
      </label>

      <label
        className={`${styles.inputWrapper} ${isError ? styles.error : ""}`}
      >
        <span className={styles.label}>{toLabel}</span>
        <input
          type="text"
          name="to"
          value={toDisplay}
          onChange={(e) => handleChange(e, "to")}
          onBlur={() => handleBlur("to")}
          className={styles.input}
          inputMode="numeric"
          autoComplete="off"
        />
      </label>
      {isError && <span className={styles.errorText}>{isError}</span>}
    </div>
  );
};

export default RangeInput;
