"use client";
import React from "react";
import styles from "./CarBookingSteps.module.css";
import Image from "next/image";

interface BookingStep {
  id: number;
  title: string;
  description: string;
}

const bookingSteps: BookingStep[] = [
  {
    id: 1,
    title: "Select Your Car",
    description:
      "Browse from a wide range of vehicles. Filter by type, price, or features to find the right fit for your trip.",
  },
  {
    id: 2,
    title: "Choose Dates & Location",
    description:
      "Pick your pickup and drop-off dates and locations. We’re available citywide for your convenience.",
  },
  {
    id: 3,
    title: "Add Extras (Optional)",
    description:
      "Upgrade with add-ons like GPS, child seats, or additional coverage for complete peace of mind.",
  },
  {
    id: 4,
    title: "Confirm & Pay",
    description:
      "Review your booking, add payment details, and confirm — your car will be ready when you arrive.",
  },
];

const CarBookingSteps: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          <div className={styles.imageContainer}>
            <Image
              src="/images/bg.jpg"
              alt="Car rental visual"
              className={styles.image}
              width={100}
              height={100}
            />
          </div>

          <div className={styles.stepsContainer}>
            <h2 className={styles.heading}>How It Works</h2>
            <ol className={styles.steps}>
              {bookingSteps.map((step) => (
                <li key={step.id} className={styles.stepItem}>
                  <div className={styles.stepNumber}>{step.id}</div>
                  <div className={styles.stepContent}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDesc}>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarBookingSteps;
