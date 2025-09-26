import { useState } from 'react';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import { formatMileage } from '../../utils/formatMileage';
import styles from './CarCard.module.css';

const CarCard = ({ car, onReadMore }) => {
  const [imageError, setImageError] = useState(false);
  
  const addressParts = car.address.split(', ');
  const city = addressParts[1];
  const country = addressParts[2];

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img 
          src={imageError ? '/placeholder-car.jpg' : car.img} 
          alt={`${car.brand} ${car.model}`}
          className={styles.image}
          onError={() => setImageError(true)}
        />
        <FavoriteButton carId={car.id} />
      </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>
            {car.brand} <span className={styles.model}>{car.model}</span>, {car.year}
          </h3>
          <span className={styles.price}>${car.rentalPrice}</span>
        </div>
        
        <div className={styles.tags}>
          <span className={styles.tag}>{city}</span>
          <span className={styles.tag}>{country}</span>
          <span className={styles.tag}>{car.rentalCompany}</span>
          <span className={styles.tag}>{car.type}</span>
          <span className={styles.tag}>{car.model}</span>
          <span className={styles.tag}>{formatMileage(car.mileage)} km</span>
        </div>
        
        <button 
          className={styles.button} 
          onClick={() => onReadMore(car)}
        >
          Read more
        </button>
      </div>
    </article>
  );
};

export default CarCard;
