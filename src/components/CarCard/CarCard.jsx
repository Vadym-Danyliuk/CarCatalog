import { useState } from "react";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { formatMileage } from "../../utils/formatMileage";
import styles from "./CarCard.module.css";

const CarCard = ({ car, onReadMore }) => {
  const [imageError, setImageError] = useState(false);

  const addressParts = car.address.split(", ");
  const city = addressParts[1] || "";
  const country = addressParts[2] || "";

  const displayItems = [...car.accessories, ...car.functionalities].slice(0, 3);

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={imageError ? "/placeholder-car.jpg" : car.img}
          alt={`${car.brand} ${car.model}`}
          className={styles.image}
          onError={() => setImageError(true)}
        />
        <FavoriteButton carId={car.id} />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>
            {car.brand} <span className={styles.model}>{car.model}</span>,{" "}
            {car.year}
          </h3>
          <span className={styles.price}>${car.rentalPrice}</span>
        </div>

        <div className={styles.details}>
          <div className={styles.detailsRow}>
            <span className={styles.detailItem}>{city}</span>
            <span className={styles.detailItem}>{country}</span>
            <span className={styles.detailItem}>{car.rentalCompany}</span>
            <span className={styles.detailItem}>{car.type}</span>
          </div>
          <div className={styles.detailsRow}>
            <span className={styles.detailItem}>{car.model}</span>
            <span className={styles.detailItem}>{car.id}</span>
            <span className={styles.detailItem}>
              Mileage: {formatMileage(car.mileage)}
            </span>
          </div>
          <div className={styles.detailsRow}>
            {displayItems.map((item, index) => (
              <span key={index} className={styles.detailItem}>
                {item}
              </span>
            ))}
          </div>
        </div>

        <button className={styles.button} onClick={() => onReadMore(car)}>
          Learn more
        </button>
      </div>
    </article>
  );
};

export default CarCard;
