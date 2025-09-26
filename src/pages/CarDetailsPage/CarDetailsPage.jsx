import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCarById } from "../../services/api";
import { formatMileage } from "../../utils/formatMileage";
import Loader from "../../components/Loader/Loader";
import styles from "./CarDetailsPage.module.css";

const CarDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  });

  useEffect(() => {
    loadCar();
  }, [id]);

  const loadCar = async () => {
    try {
      setLoading(true);
      const carData = await getCarById(id);
      setCar(carData);
    } catch (error) {
      console.error("Error loading car:", error);
      navigate("/catalog");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    navigate("/catalog");
  };

  if (loading) return <Loader />;
  if (!car) return null;

  const addressParts = car.address.split(", ");
  const city = addressParts[1];
  const country = addressParts[2];

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
        text: condition,
      };
    });
  };

  const parsedConditions = parseRentalConditions(car.rentalConditions);

  return (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        <div className={styles.imageWrapper}>
          <img
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            className={styles.image}
          />
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.bookingCard}>
            <h2 className={styles.bookingTitle}>Book your car now</h2>
            <p className={styles.bookingSubtitle}>
              Stay connected! We are always ready to help you.
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
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

              <input
                type="date"
                name="bookingDate"
                placeholder="Booking date"
                value={formData.bookingDate}
                onChange={handleInputChange}
                className={styles.input}
                required
              />

              <textarea
                name="comment"
                placeholder="Comment"
                value={formData.comment}
                onChange={handleInputChange}
                className={styles.textarea}
                rows={5}
              />

              <button type="submit" className={styles.submitBtn}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className={styles.carInfo}>
        <h1 className={styles.title}>
          {car.brand} <span className={styles.model}>{car.model}</span>,{" "}
          {car.year}
        </h1>

        <div className={styles.location}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 1C5.79086 1 4 2.79086 4 5C4 8.5 8 14 8 14S12 8.5 12 5C12 2.79086 10.2091 1 8 1Z"
              stroke="#121417"
              strokeOpacity="0.5"
              strokeWidth="1.5"
              fill="none"
            />
            <circle
              cx="8"
              cy="5"
              r="1.5"
              stroke="#121417"
              strokeOpacity="0.5"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
          {city}, {country}
          <span className={styles.mileage}>
            Mileage: {formatMileage(car.mileage)}
          </span>
        </div>

        <span className={styles.price}>${car.rentalPrice}</span>

        <p className={styles.description}>{car.description}</p>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Rental Conditions:</h3>
          <div className={styles.conditions}>
            {parsedConditions.map((condition, index) => (
              <span key={index} className={styles.condition}>
                {condition.type === "age" ? (
                  <>
                    {condition.label} :{" "}
                    <span className={styles.highlight}>
                      {condition.highlight}
                    </span>
                  </>
                ) : (
                  condition.text
                )}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Car Specifications:</h3>
          <div className={styles.specs}>
            <div className={styles.specItem}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect
                  x="2"
                  y="4"
                  width="16"
                  height="12"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M6 4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
              <span>Year: {car.year}</span>
            </div>
            <div className={styles.specItem}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect
                  x="2"
                  y="6"
                  width="16"
                  height="8"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <circle
                  cx="6"
                  cy="14.5"
                  r="1.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <circle
                  cx="14"
                  cy="14.5"
                  r="1.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
              <span>Type: {car.type}</span>
            </div>
            <div className={styles.specItem}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M3 10h14M10 3v14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
              <span>Fuel Consumption: {car.fuelConsumption}</span>
            </div>
            <div className={styles.specItem}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle
                  cx="10"
                  cy="10"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M10 6v4l3 2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
              <span>Engine Size: {car.engineSize}</span>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            Accessories and functionalities:
          </h3>
          <div className={styles.accessories}>
            {[...car.accessories, ...car.functionalities].map((item, index) => (
              <div key={index} className={styles.accessoryItem}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="2" fill="#3470FF" />
                </svg>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;
