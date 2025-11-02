"use client";

import React from "react";
import styles from "./BookingsSkeleton.module.css";

export default function BookingsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className={styles.cards}>
      {[...Array(count)].map((_, idx) => (
        <div key={idx} className={styles.card}>
          <div className={styles.cardHeader}></div>
          <div className={styles.time}></div>
          <div className={styles.route}></div>
          <div className={styles.route}></div>
          <div className={styles.car}></div>
          <div className={styles.actions}></div>
        </div>
      ))}
    </div>
  );
}
