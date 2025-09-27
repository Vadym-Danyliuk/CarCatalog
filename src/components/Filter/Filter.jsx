import { useState, useEffect } from "react";
import { getBrands } from "../../services/api";
import CustomSelect from "../CustomSelect/CustomSelect";
import RangeInput from "../RangeInput/RangeInput";
import styles from "./Filter.module.css";

const Filter = ({ onFilter }) => {
  const [brands, setBrands] = useState([]);
  const [isBrandsError, setIsBrandsError] = useState(false);
  const [filters, setFilters] = useState({
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
  });

  const priceOptions = Array.from({ length: 15 }, (_, i) =>
    (30 + i * 10).toString()
  );

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      setIsBrandsError(false);
      const data = await getBrands();
      setBrands(data);
    } catch (error) {
      setIsBrandsError(true);
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
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <div className={`${styles.item} ${styles.brand}`}>
        <div className={styles.label}>Car brand</div>
        <CustomSelect
          options={brands}
          isError={isBrandsError}
          placeholder="Choose a brand"
          onChange={(value) => setFilters({ ...filters, brand: value })}
        />
      </div>

      <div className={`${styles.item} ${styles.price}`}>
        <div className={styles.label}>Price/ 1 hour</div>
        <CustomSelect
          options={priceOptions}
          placeholder="Choose a price"
          textBeforeValue="To $"
          className={styles.priceSelect}
          onChange={(value) => setFilters({ ...filters, rentalPrice: value })}
        />
      </div>

      <div className={`${styles.item} ${styles.mileage}`}>
        <div className={styles.label}>Car mileage / km</div>
        <RangeInput
          onChange={({ from, to }) => {
            setFilters({
              ...filters,
              minMileage: from ? from.toString() : "",
              maxMileage: to ? to.toString() : "",
            });
          }}
        />
      </div>

      <div className={styles.buttonWrapper}>
        <button type="submit" className={styles.button}>
          Search
        </button>
      </div>
    </form>
  );
};

export default Filter;
