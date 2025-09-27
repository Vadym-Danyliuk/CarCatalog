import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <picture>
        <source
          media="(min-width: 1024px)"
          srcSet="/assets/home/hero-desktop.webp 1x, /assets/home/hero-desktop@2x.webp 2x"
          type="image/webp"
        />
        <source
          media="(min-width: 1024px)"
          srcSet="/assets/home/hero-desktop.jpg 1x, /assets/home/hero-desktop@2x.jpg 2x"
          type="image/jpeg"
        />
        <source
          media="(min-width: 768px)"
          srcSet="/assets/home/hero-tablet.webp 1x, /assets/home/hero-tablet@2x.webp 2x"
          type="image/webp"
        />
        <source
          media="(min-width: 768px)"
          srcSet="/assets/home/hero-tablet.jpg 1x, /assets/home/hero-tablet@2x.jpg 2x"
          type="image/jpeg"
        />
        <source
          srcSet="/assets/home/hero-mobile.webp 1x, /assets/home/hero-mobile@2x.webp 2x"
          type="image/webp"
        />
        <source
          srcSet="/assets/home/hero-mobile.jpg 1x, /assets/home/hero-mobile@2x.jpg 2x"
          type="image/jpeg"
        />
        <img
          src="/assets/home/hero-mobile.jpg"
          alt="RentalCar"
          className={styles.image}
        />
      </picture>
      <div className={styles.textWrapper}>
        <h1 className={styles.mainTitle}>Find your perfect rental car</h1>
        <h2 className={styles.subTitle}>
          Reliable and budget-friendly rentals for any journey
        </h2>
        <Link to="/catalog" className={styles.button}>
          View Catalog
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
