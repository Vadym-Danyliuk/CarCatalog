import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.brand}>RentalCar</span>
        </h1>
        <p className={styles.subtitle}>
          Find and rent your perfect car in Ukraine
        </p>
        <p className={styles.description}>
          Wide selection of vehicles for any taste and budget. 
          Quick booking, transparent prices, and excellent service.
        </p>
        <Link to="/catalog" className={styles.cta}>
          View Catalog
        </Link>
        
        <div className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>Ì∫ó</span>
            <span className={styles.featureText}>500+ Cars</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>‚≠ê</span>
            <span className={styles.featureText}>Best Prices</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>Ìª°Ô∏è</span>
            <span className={styles.featureText}>Full Insurance</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
