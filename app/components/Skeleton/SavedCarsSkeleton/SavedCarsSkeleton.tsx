"use client";

import styles from "./SavedCarsSkeleton.module.css";

export default function SavedCarsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className={styles.grid}>
      {[...Array(count)].map((_, idx) => (
        <div key={idx} className={styles.card}>
          <div className={styles.imageWrapper}></div>
          <div className={styles.info}>
            <div className={styles.name}></div>
            <div className={styles.rate}></div>
            <div className={styles.status}></div>
            <div className={styles.button}></div>
          </div>
        </div>
      ))}
    </div>
  );
}
