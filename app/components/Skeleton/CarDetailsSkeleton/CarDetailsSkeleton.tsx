"use client";

import styles from "./CarDetailsSkeleton.module.css";

export default function CarDetailsSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.mainImage}></div>
        <div className={styles.thumbnails}>
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className={styles.thumbnail}></div>
          ))}
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.title}></div>
        <div className={styles.description}></div>

        <div className={styles.specTitle}></div>
        <div className={styles.specBoxes}>
          {[...Array(7)].map((_, idx) => (
            <div key={idx} className={styles.specBox}></div>
          ))}
        </div>

        <div className={styles.rentButton}></div>
      </div>
    </div>
  );
}
