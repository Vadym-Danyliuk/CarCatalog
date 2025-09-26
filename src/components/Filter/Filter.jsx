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
