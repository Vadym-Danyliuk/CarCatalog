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
