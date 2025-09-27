import styles from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick, loading, className = "" }) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? "Loading..." : "Load more"}
    </button>
  );
};

export default LoadMoreBtn;
