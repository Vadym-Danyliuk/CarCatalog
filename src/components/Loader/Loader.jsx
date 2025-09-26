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
