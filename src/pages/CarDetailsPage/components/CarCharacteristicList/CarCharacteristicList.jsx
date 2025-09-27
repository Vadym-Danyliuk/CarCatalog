import styles from "./CarCharacteristicList.module.css";

const CarCharacteristicList = ({ title, items, className = "" }) => {
  return (
    <section className={`${styles.wrapper} ${className}`}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li key={index} className={styles.listItem}>
           <svg className={styles.icon} width="16" height="16">
              <use xlinkHref={`/assets/sprite.svg#${item.icon}`}></use>
            </svg>
            <span className={styles.text}>{item.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CarCharacteristicList;

