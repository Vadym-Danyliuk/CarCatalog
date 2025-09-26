#!/bin/bash

# Створення проекту RentalCar
echo "��� Створюємо структуру проекту RentalCar..."

# Ініціалізація Vite проекту (якщо ще не створено)
# npm create vite@latest rental-car -- --template react
# cd rental-car

# Створення основних директорій
mkdir -p src/{assets/{images,icons},components/{Layout,Header,CarCard,CarModal,Filter,LoadMoreBtn,Loader,FavoriteButton},pages/{HomePage,CatalogPage,CarDetailsPage},services,hooks,utils,context,styles}

# Створення компонентів

# Layout
cat > src/components/Layout/Layout.jsx << 'EOF'
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
EOF

cat > src/components/Layout/Layout.module.css << 'EOF'
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
  padding: 20px;
}

@media (min-width: 768px) {
  .main {
    padding: 40px;
  }
}

@media (min-width: 1440px) {
  .main {
    padding: 60px;
    max-width: 1440px;
    margin: 0 auto;
    width: 100%;
  }
}
EOF

# Header
cat > src/components/Header/Header.jsx << 'EOF'
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
          RentalCar
        </NavLink>
        <nav className={styles.nav}>
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/catalog" 
            className={({ isActive }) => 
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Catalog
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
EOF

cat > src/components/Header/Header.module.css << 'EOF'
.header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 20px;
  font-weight: 700;
  color: var(--primary-color);
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 20px;
}

.link {
  color: var(--text-primary);
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.link:hover {
  color: var(--primary-color);
  background-color: rgba(52, 112, 255, 0.1);
}

.active {
  color: var(--primary-color);
  background-color: rgba(52, 112, 255, 0.1);
}

@media (min-width: 768px) {
  .container {
    padding: 20px 40px;
  }
  
  .logo {
    font-size: 24px;
  }
  
  .nav {
    gap: 32px;
  }
}
EOF

# CarCard
cat > src/components/CarCard/CarCard.jsx << 'EOF'
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
EOF

cat > src/components/CarCard/CarCard.module.css << 'EOF'
.card {
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.imageWrapper {
  position: relative;
  width: 100%;
  height: 268px;
  overflow: hidden;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  padding: 14px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.title {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
}

.model {
  color: var(--primary-color);
}

.price {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: auto;
  padding-bottom: 28px;
}

.tag {
  font-size: 12px;
  color: var(--text-secondary);
  padding: 0 2px;
}

.tag:not(:last-child)::after {
  content: '|';
  margin-left: 6px;
}

.button {
  width: 100%;
  padding: 12px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: var(--primary-hover);
}
EOF

# FavoriteButton
cat > src/components/FavoriteButton/FavoriteButton.jsx << 'EOF'
import { useFavorites } from '../../hooks/useFavorites';
import styles from './FavoriteButton.module.css';

const FavoriteButton = ({ carId }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(carId);

  return (
    <button
      className={`${styles.button} ${isFavorite ? styles.active : ''}`}
      onClick={() => toggleFavorite(carId)}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M15.63 3.4575C15.2469 3.07425 14.7921 2.77023 14.2915 2.56281C13.7909 2.35539 13.2543 2.24863 12.7125 2.24863C12.1706 2.24863 11.634 2.35539 11.1334 2.56281C10.6329 2.77023 10.178 3.07425 9.79497 3.4575L8.99997 4.2525L8.20497 3.4575C7.43123 2.68376 6.38174 2.24863 5.28747 2.24863C4.1932 2.24863 3.14371 2.68376 2.36997 3.4575C1.59623 4.23124 1.1611 5.28073 1.1611 6.375C1.1611 7.46927 1.59623 8.51876 2.36997 9.2925L3.16497 10.0875L8.99997 15.9225L14.835 10.0875L15.63 9.2925C16.0132 8.90953 16.3172 8.45468 16.5247 7.95412C16.7321 7.45356 16.8388 6.91689 16.8388 6.375C16.8388 5.83311 16.7321 5.29644 16.5247 4.79588C16.3172 4.29532 16.0132 3.84047 15.63 3.4575Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default FavoriteButton;
EOF

cat > src/components/FavoriteButton/FavoriteButton.module.css << 'EOF'
.button {
  position: absolute;
  top: 14px;
  right: 14px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.3s ease, transform 0.2s ease;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button:hover {
  transform: scale(1.1);
}

.button.active {
  color: var(--primary-color);
}

.button.active svg path {
  fill: var(--primary-color);
}
EOF

# Filter
cat > src/components/Filter/Filter.jsx << 'EOF'
import { useState, useEffect } from 'react';
import { getBrands } from '../../services/api';
import styles from './Filter.module.css';

const Filter = ({ onFilter }) => {
  const [brands, setBrands] = useState([]);
  const [filters, setFilters] = useState({
    brand: '',
    rentalPrice: '',
    minMileage: '',
    maxMileage: ''
  });

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      const data = await getBrands();
      setBrands(data);
    } catch (error) {
      console.error('Error loading brands:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({
      brand: '',
      rentalPrice: '',
      minMileage: '',
      maxMileage: ''
    });
    onFilter({});
  };

  return (
    <form className={styles.filter} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label}>Car brand</label>
        <select
          className={styles.select}
          value={filters.brand}
          onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
        >
          <option value="">All brands</option>
          {brands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Price / 1 hour</label>
        <input
          type="number"
          className={styles.input}
          placeholder="To $"
          value={filters.rentalPrice}
          onChange={(e) => setFilters({ ...filters, rentalPrice: e.target.value })}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Car mileage / km</label>
        <div className={styles.mileageGroup}>
          <input
            type="number"
            className={styles.input}
            placeholder="From"
            value={filters.minMileage}
            onChange={(e) => setFilters({ ...filters, minMileage: e.target.value })}
          />
          <input
            type="number"
            className={styles.input}
            placeholder="To"
            value={filters.maxMileage}
            onChange={(e) => setFilters({ ...filters, maxMileage: e.target.value })}
          />
        </div>
      </div>

      <div className={styles.buttons}>
        <button type="submit" className={styles.submitBtn}>Search</button>
        <button type="button" onClick={handleReset} className={styles.resetBtn}>Reset</button>
      </div>
    </form>
  );
};

export default Filter;
EOF

cat > src/components/Filter/Filter.module.css << 'EOF'
.filter {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
  padding: 20px;
  background: #f7f7fb;
  border-radius: 14px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label {
  font-size: 14px;
  color: #8a8a89;
  font-weight: 500;
}

.select,
.input {
  padding: 14px 18px;
  border: none;
  border-radius: 14px;
  background: #fff;
  font-size: 16px;
  color: var(--text-primary);
}

.select:focus,
.input:focus {
  outline: 2px solid var(--primary-color);
}

.mileageGroup {
  display: flex;
  gap: 8px;
}

.mileageGroup .input {
  flex: 1;
}

.buttons {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.submitBtn,
.resetBtn {
  padding: 14px 44px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submitBtn {
  background-color: var(--primary-color);
  color: white;
  flex: 1;
}

.submitBtn:hover {
  background-color: var(--primary-hover);
}

.resetBtn {
  background-color: #e7e7e7;
  color: var(--text-primary);
}

.resetBtn:hover {
  background-color: #d7d7d7;
}

@media (min-width: 768px) {
  .filter {
    flex-direction: row;
    align-items: flex-end;
    flex-wrap: wrap;
  }

  .field {
    flex: 1;
    min-width: 200px;
  }

  .buttons {
    flex: 0 0 auto;
    margin-top: 0;
  }
}

@media (min-width: 1440px) {
  .filter {
    justify-content: center;
    gap: 18px;
  }

  .field {
    flex: 0 0 auto;
    min-width: 224px;
  }
}
EOF

# Loader
cat > src/components/Loader/Loader.jsx << 'EOF'
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <div className={styles.spinner}></div>
        <p className={styles.text}>Loading cars...</p>
      </div>
    </div>
  );
};

export default Loader;
EOF

cat > src/components/Loader/Loader.module.css << 'EOF'
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  padding: 40px 20px;
}

.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.text {
  color: var(--text-secondary);
  font-size: 14px;
  margin: 0;
}
EOF

# LoadMoreBtn
cat > src/components/LoadMoreBtn/LoadMoreBtn.jsx << 'EOF'
import styles from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick, loading }) => {
  return (
    <button 
      className={styles.button} 
      onClick={onClick}
      disabled={loading}
    >
      {loading ? 'Loading...' : 'Load More'}
    </button>
  );
};

export default LoadMoreBtn;
EOF

cat > src/components/LoadMoreBtn/LoadMoreBtn.module.css << 'EOF'
.button {
  display: block;
  margin: 50px auto 0;
  padding: 12px 32px;
  background: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.button:hover:not(:disabled) {
  background-color: var(--primary-color);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(52, 112, 255, 0.3);
}

.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
EOF

# CarModal
cat > src/components/CarModal/CarModal.jsx << 'EOF'
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
EOF

cat > src/components/CarModal/CarModal.module.css << 'EOF'
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--bg-modal);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.modal {
  background: white;
  border-radius: 24px;
  max-width: 541px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 40px;
  position: relative;
}

.closeBtn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--text-primary);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.closeBtn:hover {
  transform: rotate(90deg);
}

.image {
  width: 100%;
  height: 248px;
  object-fit: cover;
  border-radius: 14px;
  margin-bottom: 14px;
}

.title {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.model {
  color: var(--primary-color);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 14px;
  color: var(--text-secondary);
  font-size: 12px;
}

.tags span:not(:last-child)::after {
  content: '|';
  margin-left: 6px;
}

.description {
  font-size: 14px;
  line-height: 1.43;
  color: var(--text-primary);
  margin-bottom: 24px;
}

.section {
  margin-bottom: 24px;
}

.subtitle {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.conditions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.condition {
  padding: 7px 14px;
  background: var(--bg-condition);
  border-radius: 35px;
  font-size: 12px;
  color: #363535;
}

.condition strong {
  color: var(--primary-color);
  font-weight: 600;
}

.rentalBtn {
  display: inline-block;
  padding: 12px 50px;
  background-color: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.3s;
}

.rentalBtn:hover {
  background-color: var(--primary-hover);
}

@media (max-width: 480px) {
  .modal {
    padding: 24px;
  }
}
EOF

# Pages

# HomePage
cat > src/pages/HomePage/HomePage.jsx << 'EOF'
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
            <span className={styles.featureIcon}>���</span>
            <span className={styles.featureText}>500+ Cars</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>⭐</span>
            <span className={styles.featureText}>Best Prices</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>���️</span>
            <span className={styles.featureText}>Full Insurance</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
EOF

cat > src/pages/HomePage/HomePage.module.css << 'EOF'
.hero {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.content {
  text-align: center;
  max-width: 800px;
  animation: fadeInUp 0.8s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.title {
  font-size: 32px;
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
}

.brand {
  background: linear-gradient(90deg, #ffd700, #ffed4e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 12px;
}

.description {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 32px;
}

.cta {
  display: inline-block;
  padding: 14px 44px;
  background-color: white;
  color: #667eea;
  text-decoration: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.features {
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-top: 48px;
}

.feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.featureIcon {
  font-size: 32px;
}

.featureText {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

@media (min-width: 768px) {
  .title {
    font-size: 48px;
  }
  
  .subtitle {
    font-size: 24px;
  }
  
  .description {
    font-size: 18px;
  }
  
  .features {
    gap: 48px;
  }
  
  .featureIcon {
    font-size: 40px;
  }
  
  .featureText {
    font-size: 16px;
  }
}

@media (min-width: 1440px) {
  .title {
    font-size: 56px;
  }
}
EOF

# CatalogPage
cat > src/pages/CatalogPage/CatalogPage.jsx << 'EOF'
import { useState, useEffect } from 'react';
import { getCars } from '../../services/api';
import CarCard from '../../components/CarCard/CarCard';
import Filter from '../../components/Filter/Filter';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import Loader from '../../components/Loader/Loader';
import CarModal from '../../components/CarModal/CarModal';
import styles from './CatalogPage.module.css';

const ITEMS_PER_PAGE = 12;

const CatalogPage = () => {
  const [cars, setCars] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({});
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    loadCars();
  }, [filters]);

  const loadCars = async (pageNum = 1, append = false) => {
    try {
      append ? setLoadingMore(true) : setLoading(true);
      
      const params = {
        limit: ITEMS_PER_PAGE,
        page: pageNum,
        ...filters
      };
      
      const response = await getCars(params);
      
      if (append) {
        setCars(prev => [...prev, ...response.cars]);
      } else {
        setCars(response.cars);
      }
      
      setPage(pageNum);
      setHasMore(response.page < response.totalPages);
    } catch (error) {
      console.error('Error loading cars:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleFilter = (newFilters) => {
    // Очищаємо пусті значення
    const cleanFilters = Object.entries(newFilters).reduce((acc, [key, value]) => {
      if (value) acc[key] = value;
      return acc;
    }, {});
    
    setFilters(cleanFilters);
    setPage(1);
  };

  const handleLoadMore = () => {
    loadCars(page + 1, true);
  };

  const handleReadMore = (car) => {
    setSelectedCar(car);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Our Fleet</h1>
      
      <Filter onFilter={handleFilter} />
      
      {loading ? (
        <Loader />
      ) : (
        <>
          {cars.length > 0 ? (
            <>
              <div className={styles.grid}>
                {cars.map(car => (
                  <CarCard 
                    key={car.id} 
                    car={car}
                    onReadMore={handleReadMore}
                  />
                ))}
              </div>
              
              {hasMore && (
                <LoadMoreBtn 
                  onClick={handleLoadMore} 
                  loading={loadingMore}
                />
              )}
            </>
          ) : (
            <div className={styles.empty}>
              <p>No cars found matching your criteria.</p>
              <p>Try adjusting your filters.</p>
            </div>
          )}
        </>
      )}
      
      {selectedCar && (
        <CarModal 
          car={selectedCar} 
          onClose={() => setSelectedCar(null)}
        />
      )}
    </div>
  );
};

export default CatalogPage;
EOF

cat > src/pages/CatalogPage/CatalogPage.module.css << 'EOF'
.container {
  padding: 20px;
  max-width: 1440px;
  margin: 0 auto;
}

.title {
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 32px;
  color: var(--text-primary);
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 50px;
}

.empty {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-secondary);
}

.empty p {
  margin: 8px 0;
  font-size: 16px;
}

@media (min-width: 768px) {
  .container {
    padding: 40px;
  }
  
  .title {
    font-size: 36px;
    margin-bottom: 40px;
  }
  
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 29px;
  }
}

@media (min-width: 1440px) {
  .container {
    padding: 60px;
  }
  
  .title {
    font-size: 42px;
    margin-bottom: 50px;
  }
  
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
EOF

# CarDetailsPage
cat > src/pages/CarDetailsPage/CarDetailsPage.jsx << 'EOF'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarById } from '../../services/api';
import { formatMileage } from '../../utils/formatMileage';
import Loader from '../../components/Loader/Loader';
import FavoriteButton from '../../components/FavoriteButton/FavoriteButton';
import toast from 'react-hot-toast';
import styles from './CarDetailsPage.module.css';

const CarDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    startDate: '',
    endDate: '',
    message: ''
  });

  useEffect(() => {
    loadCarDetails();
  }, [id]);

  const loadCarDetails = async () => {
    try {
      setLoading(true);
      const data = await getCarById(id);
      setCar(data);
    } catch (error) {
      console.error('Error loading car details:', error);
      toast.error('Failed to load car details');
      navigate('/catalog');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Валідація
    if (!formData.name || !formData.email || !formData.phone || !formData.startDate || !formData.endDate) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Успішне бронювання
    toast.success(`Successfully booked ${car.brand} ${car.model}!`);
    
    // Очищення форми
    setFormData({
      name: '',
      email: '',
      phone: '',
      startDate: '',
      endDate: '',
      message: ''
    });
  };

  if (loading) return <Loader />;
  if (!car) return null;

  const addressParts = car.address.split(', ');
  const city = addressParts[1];
  const country = addressParts[2];

  return (
    <div className={styles.container}>
      <button onClick={() => navigate('/catalog')} className={styles.backBtn}>
        ← Back to Catalog
      </button>

      <div className={styles.content}>
        <div className={styles.imageSection}>
          <div className={styles.imageWrapper}>
            <img src={car.img} alt={`${car.brand} ${car.model}`} className={styles.image} />
            <FavoriteButton carId={car.id} />
          </div>
          
          <div className={styles.info}>
            <h1 className={styles.title}>
              {car.brand} <span className={styles.model}>{car.model}</span>, {car.year}
            </h1>
            
            <div className={styles.price}>
              <span className={styles.priceLabel}>Price:</span>
              <span className={styles.priceValue}>${car.rentalPrice}/hour</span>
            </div>

            <div className={styles.details}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Location:</span>
                <span>{city}, {country}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Type:</span>
                <span>{car.type}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Mileage:</span>
                <span>{formatMileage(car.mileage)} km</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Fuel Consumption:</span>
                <span>{car.fuelConsumption}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Engine Size:</span>
                <span>{car.engineSize}</span>
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Description</h2>
              <p className={styles.description}>{car.description}</p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Accessories and functionalities</h2>
              <div className={styles.tags}>
                {[...car.accessories, ...car.functionalities].map((item, index) => (
                  <span key={index} className={styles.tag}>{item}</span>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Rental Conditions</h2>
              <div className={styles.conditions}>
                {car.rentalConditions.map((condition, index) => (
                  <span key={index} className={styles.condition}>{condition}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bookingSection}>
          <h2 className={styles.bookingTitle}>Book this car</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="+380 XX XXX XX XX"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>End Date *</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Additional Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className={styles.textarea}
                placeholder="Any special requests..."
                rows="4"
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;
EOF

cat > src/pages/CarDetailsPage/CarDetailsPage.module.css << 'EOF'
.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px;
}

.backBtn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 24px;
}

.backBtn:hover {
  background: var(--primary-color);
  color: white;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.imageSection {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.imageWrapper {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.image {
  width: 100%;
  height: auto;
  border-radius: 14px;
  object-fit: cover;
}

.info {
  flex: 1;
}

.title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--text-primary);
}

.model {
  color: var(--primary-color);
}

.price {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  padding: 12px 20px;
  background: var(--bg-condition);
  border-radius: 12px;
  width: fit-content;
}

.priceLabel {
  color: var(--text-secondary);
}

.priceValue {
  font-size: 20px;
  font-weight: 600;
  color: var(--primary-color);
}

.details {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-bottom: 24px;
}

.detailItem {
  display: flex;
  gap: 8px;
}

.detailLabel {
  font-weight: 500;
  color: var(--text-secondary);
}

.section {
  margin-bottom: 24px;
}

.sectionTitle {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.description {
  line-height: 1.6;
  color: var(--text-primary);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 6px 12px;
  background: var(--bg-condition);
  border-radius: 20px;
  font-size: 12px;
  color: var(--text-primary);
}

.conditions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.condition {
  padding: 8px 16px;
  background: var(--bg-condition);
  border-radius: 35px;
  font-size: 14px;
  color: var(--text-primary);
}

.bookingSection {
  background: #f7f7fb;
  border-radius: 14px;
  padding: 32px;
}

.bookingTitle {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  color: var(--text-primary);
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.formRow {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.formGroup {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
}

.input,
.textarea {
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.input:focus,
.textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

.textarea {
  resize: vertical;
  min-height: 100px;
}

.submitBtn {
  padding: 14px 32px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submitBtn:hover {
  background: var(--primary-hover);
}

@media (min-width: 768px) {
  .container {
    padding: 40px;
  }

  .imageSection {
    flex-direction: row;
    gap: 40px;
  }

  .imageWrapper {
    flex: 0 0 400px;
  }

  .details {
    grid-template-columns: repeat(2, 1fr);
  }

  .formRow {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1440px) {
  .container {
    padding: 60px;
  }

  .title {
    font-size: 32px;
  }
}
EOF

# Services
cat > src/services/api.js << 'EOF'
import axios from 'axios';

const API_BASE_URL = 'https://car-rental-api.goit.global';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor для обробки помилок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
);

export const getCars = async (params = {}) => {
  try {
    const response = await api.get('/cars', { params });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch cars');
  }
};

export const getCarById = async (id) => {
  try {
    const response = await api.get(`/cars/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch car details');
  }
};

export const getBrands = async () => {
  try {
    const response = await api.get('/brands');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch brands');
  }
};
EOF

# Hooks
cat > src/hooks/useFavorites.js << 'EOF'
import { useState, useEffect, useContext, createContext } from 'react';
import { getFavorites, saveFavorites } from '../utils/localStorage';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = getFavorites();
    setFavorites(saved);
  }, []);

  const toggleFavorite = (carId) => {
    setFavorites(prev => {
      const updated = prev.includes(carId)
        ? prev.filter(id => id !== carId)
        : [...prev, carId];
      
      saveFavorites(updated);
      return updated;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};
EOF

# Utils
cat > src/utils/formatMileage.js << 'EOF'
export const formatMileage = (mileage) => {
  return mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};
EOF

cat > src/utils/localStorage.js << 'EOF'
const FAVORITES_KEY = 'rental_car_favorites';

export const getFavorites = () => {
  try {
    const saved = localStorage.getItem(FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error reading favorites from localStorage:', error);
    return [];
  }
};

export const saveFavorites = (favorites) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error);
  }
};
EOF

# Styles
cat > src/styles/globals.css << 'EOF'
:root {
  /* Colors */
  --primary-color: #3470FF;
  --primary-hover: #0B44CD;
  --text-primary: #121417;
  --text-secondary: rgba(18, 20, 23, 0.5);
  --bg-modal: rgba(18, 20, 23, 0.5);
  --bg-condition: #F9F9F9;
  
  /* Fonts */
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-family);
  font-size: 16px;
  line-height: 1.5;
  color: var(--text-primary);
  background-color: #ffffff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

button {
  font-family: inherit;
  cursor: pointer;
}

input,
textarea,
select {
  font-family: inherit;
  font-size: inherit;
}

a {
  color: inherit;
  text-decoration: none;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.2;
}

/* Utility classes */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: var(--text-secondary);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--text-primary);
}
EOF

cat > src/styles/variables.css << 'EOF'
/* This file can be used for additional CSS variables if needed */
/* Variables are already defined in globals.css */
EOF

# Main App files
cat > src/App.jsx << 'EOF'
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import CarDetailsPage from './pages/CarDetailsPage/CarDetailsPage';
import { FavoritesProvider } from './hooks/useFavorites';
import './styles/globals.css';

function App() {
  return (
    <FavoritesProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="catalog/:id" element={<CarDetailsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </FavoritesProvider>
  );
}

export default App;
EOF

cat > src/main.jsx << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
EOF

# Update index.html
cat > index.html << 'EOF'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="RentalCar - Find and rent your perfect car in Ukraine. Wide selection of vehicles for any taste and budget." />
    <meta name="keywords" content="car rental, Ukraine, rent a car, vehicle rental" />
    <meta name="author" content="RentalCar" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <title>RentalCar - Car Rental Service in Ukraine</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
EOF

# Create README.md
cat > README.md << 'EOF'
# RentalCar - Car Rental Service ���

## ��� Опис проекту

RentalCar - це веб-додаток для компанії з оренди автомобілів в Україні. Додаток надає користувачам можливість переглядати каталог доступних автомобілів, фільтрувати їх за різними параметрами, додавати в обрані та бронювати.

## ✨ Основні функції

- ��� **Головна сторінка** з привітанням та CTA для переходу до каталогу
- ��� **Каталог автомобілів** з можливістю перегляду всіх доступних авто
- ��� **Фільтрація** за брендом, ціною та пробігом
- ❤️ **Обрані** - можливість додавати авто в список обраних
- ��� **Детальна інформація** про кожен автомобіль
- ��� **Форма бронювання** з валідацією
- ��� **Адаптивний дизайн** (mobile-first, від 320px)
- ��� **Збереження обраних** у LocalStorage

## ��� Технології

- **React 18** - JavaScript бібліотека для створення UI
- **Vite** - швидкий збірник для веб-додатків
- **React Router v6** - маршрутизація
- **Axios** - HTTP клієнт для API запитів
- **CSS Modules** - стилізація компонентів
- **React Hot Toast** - нотифікації

## ��� Встановлення та запуск

### Передумови

- Node.js (v16+)
- npm або yarn

### Кроки встановлення

1. Клонуйте репозиторій:
```bash
git clone https://github.com/yourusername/rental-car.git
cd rental-car
```

2. Встановіть залежності:
```bash
npm install
```

3. Запустіть проект в режимі розробки:
```bash
npm run dev
```

4. Відкрийте в браузері:
```
http://localhost:5173
```

### Команди

- `npm run dev` - запуск dev сервера
- `npm run build` - збірка для продакшну
- `npm run preview` - перегляд збірки
- `npm run lint` - перевірка коду

## ��� Структура проекту

```
src/
├── assets/          # Статичні ресурси
├── components/      # Переиспользуемые компоненти
│   ├── Layout/
│   ├── Header/
│   ├── CarCard/
│   ├── CarModal/
│   ├── Filter/
│   └── ...
├── pages/          # Сторінки додатку
│   ├── HomePage/
│   ├── CatalogPage/
│   └── CarDetailsPage/
├── services/       # API сервіси
├── hooks/          # Кастомні хуки
├── utils/          # Утиліти
└── styles/         # Глобальні стилі
```

## ��� API

Додаток використовує REST API для роботи з даними автомобілів:

- Base URL: `https://car-rental-api.goit.global`
- Endpoints:
  - `GET /cars` - список автомобілів з фільтрацією
  - `GET /cars/:id` - деталі автомобіля
  - `GET /brands` - список брендів

## ��� Дизайн

- Mobile-first підхід
- Breakpoints:
  - Mobile: 320px - 767px
  - Tablet: 768px - 1439px
  - Desktop: 1440px+
- Кольорова схема:
  - Primary: #3470FF
  - Text: #121417
  - Secondary: rgba(18, 20, 23, 0.5)

## ��� Ліцензія

MIT

## ���‍��� Автор

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourname)

## ��� Демо

[Live Demo на Vercel](https://rental-car.vercel.app)

---

Розроблено з ❤️ для GoIT
EOF

# Create .gitignore
cat > .gitignore << 'EOF'
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Environment variables
.env
.env.local
.env.production
EOF

# Create package.json
cat > package.json << 'EOF'
{
  "name": "rental-car",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.6.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hot-toast": "^2.4.1",
    "react-router-dom": "^6.20.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.0",
    "eslint": "^8.55.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "vite": "^5.0.8"
  }
}
EOF

# Create vite.config.js
cat > vite.config.js << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
})
EOF

# Create placeholder car image (if needed)
mkdir -p public
cat > public/placeholder-car.jpg << 'EOF'
# This would be a placeholder image file
# You should add an actual placeholder car image here
EOF

echo "✅ Структура проекту успішно створена!"
echo ""
echo "��� Наступні кроки:"
echo "1. Перейдіть в папку проекту: cd rental-car"
echo "2. Встановіть залежності: npm install"
echo "3. Запустіть проект: npm run dev"
echo "4. Додайте placeholder зображення автомобіля в public/placeholder-car.jpg"
echo ""
echo "��� Не забудьте:"
echo "- Перевірити всі endpoint'и API"
echo "- Протестувати адаптивність на різних пристроях"
echo "- Перевірити консоль на наявність помилок"
echo "- Задеплоїти проект на Vercel/Netlify"
echo ""
echo "Happy coding! ���"
