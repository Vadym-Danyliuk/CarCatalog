import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.brand}>RentalCar</span>
        </h1>
        <p className={styles.subtitle}>Find Your Perfect Ride in Ukraine</p>
        <p className={styles.description}>
          Discover our wide selection of premium vehicles for rent. From compact
          cars to luxury SUVs, we have the perfect car for every journey and
          budget.
        </p>

        <Link to="/catalog" className={styles.cta}>
          View Catalog
        </Link>

        <div className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🚗</div>
            <p className={styles.featureText}>Premium Fleet</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>💰</div>
            <p className={styles.featureText}>Best Prices</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🔒</div>
            <p className={styles.featureText}>Secure Booking</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
