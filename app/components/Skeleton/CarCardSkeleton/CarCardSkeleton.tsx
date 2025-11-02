"use client";

import React from "react";
import styles from "./CarCardSkeleton.module.css";

export default function CarCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.imageSkeleton}></div>
      <div className={styles.content}>
        <div className={styles.titleSkeleton}></div>
        <div className={styles.badgeSkeleton}></div>
        <div className={styles.priceSkeleton}></div>
        <div className={styles.featuresSkeleton}>
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className={styles.featureSkeleton}></div>
          ))}
        </div>
        <div className={styles.buttonSkeleton}></div>
      </div>
    </div>
  );
}
