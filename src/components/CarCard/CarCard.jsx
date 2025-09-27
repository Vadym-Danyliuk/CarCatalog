import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { formatMileage } from "../../utils/formatMileage";
import styles from "./CarCard.module.css";

const CarCard = ({ car }) => {
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const addressParts = car.address.split(", ");
  const city = addressParts[1] || "";
  const country = addressParts[2] || "";

  const handleLearnMore = () => {
    navigate(`/car/${car.id}`);
  };

  return (
    <section className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={imageError ? "/placeholder-car.jpg" : car.img}
          alt={`${car.brand} ${car.model}`}
          className={styles.image}
          onError={() => setImageError(true)}
          loading="lazy"
        />
        <FavoriteButton carId={car.id} />
      </div>

      <div className={styles.content}>
        <div className={styles.titleWrap}>
          <h3 className={styles.title}>
            {car.brand} <span className={styles.modelColor}>{car.model}</span>,{" "}
            {car.year}
          </h3>
          <p className={styles.price}>${car.rentalPrice}</p>
        </div>

        <p className={styles.chips}>
          <span className={styles.chipsItem}>{city}</span>
          <span className={styles.chipsItem}>{country}</span>
          <span className={styles.chipsItem}>{car.rentalCompany}</span>
          <span>
            <span className={`${styles.capitalize} ${styles.chipsItem}`}>
              {car.type}
            </span>
            {formatMileage(car.mileage)} km
          </span>
        </p>

        <button className={styles.button} onClick={handleLearnMore}>
          Learn more
        </button>
      </div>
    </section>
  );
};

export default CarCard;
