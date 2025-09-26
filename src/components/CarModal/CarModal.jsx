import { useEffect, useState } from "react";
import { formatMileage } from "../../utils/formatMileage";
import styles from "./CarModal.module.css";

const CarModal = ({ car, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    startDate: "",
    endDate: "",
    message: "",
  });

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  if (!car) return null;

  const addressParts = car.address.split(", ");
  const city = addressParts[1];
  const country = addressParts[2];

  // Розбиваємо умови оренди згідно з макетом
  const parseRentalConditions = (conditions) => {
    return conditions.map((condition) => {
      if (condition.includes("Minimum age")) {
        const age = condition.match(/\d+/)?.[0];
        return {
          type: "age",
          label: "Minimum age",
          value: age,
          highlight: age,
        };
      }
      return {
        type: "regular",
        label: condition.split(":")[0] || condition,
        value: condition.split(":")[1] || "",
        text: condition,
      };
    });
  };

  const parsedConditions = parseRentalConditions(car.rentalConditions);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={styles.carInfo}>
          <div className={styles.imageWrapper}>
            <img
              src={car.img}
              alt={`${car.brand} ${car.model}`}
              className={styles.image}
            />
          </div>

          <h2 className={styles.title}>
            {car.brand} <span className={styles.model}>{car.model}</span>,{" "}
            {car.year}
          </h2>

          <div className={styles.details}>
            <span>{city}</span>
            <span>{country}</span>
            <span>Id: {car.id}</span>
            <span>Year: {car.year}</span>
            <span>Type: {car.type}</span>
            <span>Fuel Consumption: {car.fuelConsumption}</span>
            <span>Engine Size: {car.engineSize}</span>
          </div>

          <p className={styles.description}>{car.description}</p>

          <div className={styles.section}>
            <h3 className={styles.subtitle}>
              Accessories and functionalities:
            </h3>
            <div className={styles.accessories}>
              {[...car.accessories, ...car.functionalities].map(
                (item, index) => (
                  <span key={index}>{item}</span>
                )
              )}
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.subtitle}>Rental Conditions:</h3>
            <div className={styles.conditions}>
              {parsedConditions.map((condition, index) => (
                <span key={index} className={styles.condition}>
                  {condition.type === "age" ? (
                    <>
                      {condition.label}:{" "}
                      <span className={styles.highlight}>
                        {condition.highlight}
                      </span>
                    </>
                  ) : (
                    condition.text
                  )}
                </span>
              ))}
              <span className={styles.condition}>
                Mileage:{" "}
                <span className={styles.highlight}>
                  {formatMileage(car.mileage)}
                </span>
              </span>
              <span className={styles.condition}>
                Price:{" "}
                <span className={styles.highlight}>${car.rentalPrice}</span>
              </span>
            </div>
          </div>
        </div>

        <div className={styles.bookingSection}>
          <h3 className={styles.bookingTitle}>Book your rental car</h3>
          <p className={styles.bookingSubtitle}>
            Fill out the rental form and we will contact you
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="name"
                placeholder="Name*"
                value={formData.name}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email*"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type="tel"
                name="phone"
                placeholder="Phone number*"
                value={formData.phone}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.dateGroup}>
              <div className={styles.dateInputWrapper}>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className={styles.dateInput}
                  required
                />
                <label className={styles.dateLabel}>Rental date*</label>
              </div>
              <div className={styles.dateInputWrapper}>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className={styles.dateInput}
                  required
                />
                <label className={styles.dateLabel}>Return date*</label>
              </div>
            </div>

            <textarea
              name="message"
              placeholder="Comment"
              value={formData.message}
              onChange={handleInputChange}
              className={styles.textarea}
              rows={4}
            />

            <button type="submit" className={styles.submitBtn}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CarModal;
