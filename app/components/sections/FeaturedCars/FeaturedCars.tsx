"use client";
import React from "react";
import styles from "./FeaturedCars.module.css";
import Button from "../../ui/Button/Button";

export interface CarFeature {
  name: string;
  icon: React.ReactNode;
}

export interface Car {
  id: number;
  make: string;
  type: string;
  pricePerDay: number;
  imageUrl: string;
  features: CarFeature[];
}

interface FeaturedCarsProps {
  title?: string;
  viewAllLabel?: string;
  onViewAll?: () => void;
  cars: Car[];
  buttonText?: string;
  gridCols?: 2 | 3 | 4;
  showButton?: boolean;
  outlineButton?: boolean;
}

const FeaturedCars: React.FC<FeaturedCarsProps> = ({
  title = "Choose the car that suits you",
  viewAllLabel = "View All",
  onViewAll,
  cars,
  buttonText = "View Details",
  gridCols = 3,
  showButton = true,
  outlineButton = false,
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {onViewAll && (
            <button className={styles.viewAll} onClick={onViewAll}>
              {viewAllLabel}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                className={styles.arrow}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          )}
        </div>

        <div
          className={`${styles.grid} ${
            gridCols === 2
              ? styles.twoCols
              : gridCols === 4
              ? styles.fourCols
              : styles.threeCols
          }`}
        >
          {cars.map((car) => (
            <div key={car.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img
                  src={car.imageUrl}
                  alt={`${car.make} ${car.type}`}
                  className={styles.image}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/400x250/d1d5db/FFFFFF?text=Image+Not+Found";
                  }}
                />
              </div>

              <div className={styles.content}>
                <div className={styles.topRow}>
                  <div>
                    <h3 className={styles.make}>{car.make}</h3>
                    <p className={styles.type}>{car.type}</p>
                  </div>
                  <div className={styles.price}>
                    <p>${car.pricePerDay}</p>
                    <span>per day</span>
                  </div>
                </div>

                <hr className={styles.divider} />

                <div className={styles.features}>
                  {car.features.map((f) => (
                    <div key={f.name} className={styles.feature}>
                      {f.icon}
                      <span>{f.name}</span>
                    </div>
                  ))}
                </div>

                {showButton && (
                  <button
                    className={`${styles.button} ${
                      outlineButton ? styles.outline : ""
                    }`}
                  >
                    {buttonText}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
