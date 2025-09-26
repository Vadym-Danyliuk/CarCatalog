import { useEffect } from 'react';
import { formatMileage } from '../../utils/formatMileage';
import styles from './CarModal.module.css';

const CarModal = ({ car, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!car) return null;

  const addressParts = car.address.split(', ');
  const city = addressParts[1];
  const country = addressParts[2];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>
        
        <img src={car.img} alt={`${car.brand} ${car.model}`} className={styles.image} />
        
        <h2 className={styles.title}>
          {car.brand} <span className={styles.model}>{car.model}</span>, {car.year}
        </h2>
        
        <div className={styles.tags}>
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
          <h3 className={styles.subtitle}>Accessories and functionalities:</h3>
          <div className={styles.tags}>
            {[...car.accessories, ...car.functionalities].map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </div>
        </div>
        
        <div className={styles.section}>
          <h3 className={styles.subtitle}>Rental Conditions:</h3>
          <div className={styles.conditions}>
            {car.rentalConditions.map((condition, index) => (
              <span key={index} className={styles.condition}>
                {condition}
              </span>
            ))}
            <span className={styles.condition}>
              Mileage: <strong>{formatMileage(car.mileage)}</strong>
            </span>
            <span className={styles.condition}>
              Price: <strong>${car.rentalPrice}</strong>
            </span>
          </div>
        </div>
        
        <a href="tel:+380730000000" className={styles.rentalBtn}>
          Rental car
        </a>
      </div>
    </div>
  );
};

export default CarModal;
