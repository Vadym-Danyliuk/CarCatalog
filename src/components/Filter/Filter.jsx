import { useState, useEffect } from "react";
import { getBrands } from "../../services/api";
import styles from "./Filter.module.css";

const Filter = ({ onFilter }) => {
  const [brands, setBrands] = useState([]);
  const [filters, setFilters] = useState({
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
  });

  const priceOptions = [30, 40, 50, 60, 70, 80, 90, 100];

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      const data = await getBrands();
      setBrands(data);
    } catch (error) {
      console.error("Error loading brands:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});

    onFilter(cleanFilters);
  };

  return (
    <form className={styles.filter} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label}>Car brand</label>
        <div className={styles.selectWrapper}>
          <select
            className={styles.select}
            value={filters.brand}
            onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
          >
            <option value="">Choose a brand</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          <svg
            className={styles.selectIcon}
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Price/ 1 hour</label>
        <div className={styles.selectWrapper}>
          <select
            className={styles.select}
            value={filters.rentalPrice}
            onChange={(e) =>
              setFilters({ ...filters, rentalPrice: e.target.value })
            }
          >
            <option value="">Choose a price</option>
            {priceOptions.map((price) => (
              <option key={price} value={price}>
                To ${price}
              </option>
            ))}
          </select>
          <svg
            className={styles.selectIcon}
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Car mileage / km</label>
        <div className={styles.mileageGroup}>
          <input
            type="number"
            className={styles.input}
            placeholder="From"
            value={filters.minMileage}
            onChange={(e) =>
              setFilters({ ...filters, minMileage: e.target.value })
            }
          />
          <input
            type="number"
            className={styles.input}
            placeholder="To"
            value={filters.maxMileage}
            onChange={(e) =>
              setFilters({ ...filters, maxMileage: e.target.value })
            }
          />
        </div>
      </div>

      <button type="submit" className={styles.submitBtn}>
        Search
      </button>
    </form>
  );
};

export default Filter;
