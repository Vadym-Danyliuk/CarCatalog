import { useState, useEffect } from "react";
import { getCars } from "../../services/api";
import CarCard from "../../components/CarCard/CarCard";
import Filter from "../../components/Filter/Filter";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import Loader from "../../components/Loader/Loader";
import styles from "./CatalogPage.module.css";

const ITEMS_PER_PAGE = 12;

const CatalogPage = () => {
  const [cars, setCars] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    loadCars();
  }, [filters]);

  const loadCars = async (pageNum = 1, append = false) => {
    try {
      append ? setLoadingMore(true) : setLoading(true);

      const params = {
        limit: ITEMS_PER_PAGE,
        page: pageNum,
        ...filters,
      };

      const response = await getCars(params);

      if (append) {
        setCars((prev) => [...prev, ...response.cars]);
      } else {
        setCars(response.cars);
      }

      setPage(pageNum);
      setHasMore(response.page < response.totalPages);
    } catch (error) {
      console.error("Error loading cars:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleFilter = (newFilters) => {
    const cleanFilters = Object.entries(newFilters).reduce(
      (acc, [key, value]) => {
        if (value) acc[key] = value;
        return acc;
      },
      {}
    );

    setFilters(cleanFilters);
    setPage(1);
  };

  const handleLoadMore = () => {
    loadCars(page + 1, true);
  };

  return (
    <div className={styles.container}>
      <Filter onFilter={handleFilter} />

      {loading ? (
        <Loader />
      ) : (
        <>
          {cars.length > 0 ? (
            <>
              <div className={styles.grid}>
                {cars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>

              {hasMore && (
                <LoadMoreBtn onClick={handleLoadMore} loading={loadingMore} />
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
    </div>
  );
};

export default CatalogPage;
