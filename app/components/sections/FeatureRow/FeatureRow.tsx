import React from "react";
import styles from "./FeatureRow.module.css";
import { FaCarSide, FaCouch, FaPiggyBank } from "react-icons/fa";

const FeatureRow: React.FC = () => {
  return (
    <section className={styles.featureRow}>
      <div className={styles.featureCard}>
        <FaCarSide className={styles.icon} />
        <div className={styles.textContent}>
          <h3 className={styles.heading}>Availability</h3>
          <p className={styles.desc}>
            Book instantly — 24/7 access to top-rated vehicles at your
            fingertips.
          </p>
        </div>
      </div>

      <div className={styles.featureCard}>
        <FaCouch className={styles.icon} />
        <div className={styles.textContent}>
          <h3 className={styles.heading}>Comfort</h3>
          <p className={styles.desc}>
            Enjoy premium comfort and cleanliness, every drive feels
            first-class.
          </p>
        </div>
      </div>

      <div className={styles.featureCard}>
        <FaPiggyBank className={styles.icon} />
        <div className={styles.textContent}>
          <h3 className={styles.heading}>Savings</h3>
          <p className={styles.desc}>
            Transparent pricing with no hidden fees — drive smarter, spend less.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureRow;
