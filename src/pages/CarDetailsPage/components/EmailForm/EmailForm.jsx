import { useState } from "react";
import { toast } from "react-hot-toast";
import DatePicker from "../DatePicker/DatePicker";
import styles from "./EmailForm.module.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUCCESS_MESSAGE_DURATION = 7000;

const EmailForm = ({ carId, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.bookingDate) {
      newErrors.bookingDate = "Booking date is required";
    } else {
      const selectedDate = new Date(formData.bookingDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.bookingDate = "Booking date cannot be in the past";
      }
      const oneYearFromNow = new Date();
      oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
      if (selectedDate > oneYearFromNow) {
        newErrors.bookingDate = "Booking date cannot be more than 1 year in advance";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, bookingDate: date }));
    if (errors.bookingDate) {
      setErrors((prev) => ({ ...prev, bookingDate: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstError = Object.values(errors)[0];
      if (firstError) {
        toast.error(firstError);
      }
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Booking submitted:", {
        carId,
        ...formData,
        submittedAt: new Date().toISOString(),
      });

      setFormData({
        name: "",
        email: "",
        bookingDate: "",
        comment: "",
      });

      setShowBookingSuccess(true);
      toast.success("Booking successful! We will contact you soon.");
      
      setTimeout(() => {
        setShowBookingSuccess(false);
        if (onClose) {
          setTimeout(onClose, 500);
        }
      }, SUCCESS_MESSAGE_DURATION);

    } catch (error) {
      console.error("Failed to submit booking:", error);
      toast.error("Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      bookingDate: "",
      comment: "",
    });
    setErrors({});
    setShowBookingSuccess(false);
  };

  return (
    <div className={styles.emailFormContainer}>
      <div className={styles.emailFormHeader}>
        <h2 className={styles.emailFormTitle}>Book your car now</h2>
        <p className={styles.emailFormSubtitle}>
          Stay connected! We are always ready to help you.
        </p>
      </div>

      {showBookingSuccess ? (
        <div className={styles.successContainer}>
          <div className={styles.successIcon}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="24" fill="#10B981" opacity="0.1"/>
              <path
                d="M16 24L22 30L32 18"
                stroke="#10B981"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className={styles.successTitle}>Booking Confirmed!</h3>
          <p className={styles.successMessage}>
            Your booking request has been submitted successfully. 
            We will contact you within 24 hours to confirm the details.
          </p>
          <button 
            className={styles.newBookingButton}
            onClick={resetForm}
            type="button"
          >
            Make Another Booking
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.emailForm} noValidate>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="name"
              placeholder="Name*"
              value={formData.name}
              onChange={handleInputChange}
              className={`${styles.formInput} ${
                errors.name ? styles.inputError : ""
              }`}
              disabled={isSubmitting}
              maxLength={50}
              autoComplete="name"
            />
            {errors.name && (
              <span className={styles.errorMessage} role="alert">
                {errors.name}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <input
              type="email"
              name="email"
              placeholder="Email*"
              value={formData.email}
              onChange={handleInputChange}
              className={`${styles.formInput} ${
                errors.email ? styles.inputError : ""
              }`}
              disabled={isSubmitting}
              autoComplete="email"
            />
            {errors.email && (
              <span className={styles.errorMessage} role="alert">
                {errors.email}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <DatePicker
              value={formData.bookingDate}
              onChange={handleDateChange}
              error={!!errors.bookingDate}
              disabled={isSubmitting}
              placeholder="Booking date*"
            />
            {errors.bookingDate && (
              <span className={styles.errorMessage} role="alert">
                {errors.bookingDate}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <textarea
              name="comment"
              placeholder="Comment (optional)"
              value={formData.comment}
              onChange={handleInputChange}
              className={`${styles.formTextarea} ${
                errors.comment ? styles.inputError : ""
              }`}
              rows={4}
              disabled={isSubmitting}
              maxLength={500}
            />
            <div className={styles.characterCount}>
              {formData.comment.length}/500
            </div>
            {errors.comment && (
              <span className={styles.errorMessage} role="alert">
                {errors.comment}
              </span>
            )}
          </div>

          <button
            type="submit"
            className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className={styles.buttonContent}>
                <svg className={styles.spinner} width="20" height="20" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" 
                          fill="none" strokeDasharray="50.27" strokeDashoffset="50.27">
                    <animate attributeName="stroke-dashoffset" dur="1s" 
                             values="50.27;0;50.27" repeatCount="indefinite"/>
                  </circle>
                </svg>
                Sending...
              </span>
            ) : (
              "Send"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default EmailForm;