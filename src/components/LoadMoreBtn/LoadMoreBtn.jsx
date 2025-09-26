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
