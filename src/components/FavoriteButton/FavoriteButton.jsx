import { useFavorites } from "../../hooks/useFavorites";
import styles from "./FavoriteButton.module.css";

const FavoriteButton = ({ carId }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(carId);

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(carId);
  };

  return (
    <button
      className={styles.favoriteButton}
      onClick={handleToggleFavorite}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? (
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path
            d="M7.99996 2.66675C6.89329 1.56008 5.16663 1.56008 4.05996 2.66675C2.95329 3.77341 2.95329 5.50008 4.05996 6.60675L7.99996 10.5467L11.94 6.60675C13.0466 5.50008 13.0466 3.77341 11.94 2.66675C10.8333 1.56008 9.10663 1.56008 7.99996 2.66675Z"
            fill="#3470FF"
            stroke="#3470FF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path
            d="M7.99996 2.66675C6.89329 1.56008 5.16663 1.56008 4.05996 2.66675C2.95329 3.77341 2.95329 5.50008 4.05996 6.60675L7.99996 10.5467L11.94 6.60675C13.0466 5.50008 13.0466 3.77341 11.94 2.66675C10.8333 1.56008 9.10663 1.56008 7.99996 2.66675Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      )}
    </button>
  );
};

export default FavoriteButton;
