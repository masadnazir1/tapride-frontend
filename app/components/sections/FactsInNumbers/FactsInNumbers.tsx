import React from "react";
import styles from "./FactsInNumbers.module.css";
import {
  FaCarSide,
  FaUsers,
  FaCalendarAlt,
  FaTachometerAlt,
} from "react-icons/fa";

interface Stat {
  id: number;
  value: string;
  label: string;
  icon: React.ReactNode;
}

const stats: Stat[] = [
  {
    id: 1,
    value: "540+",
    label: "Cars",
    icon: <FaCarSide />,
  },
  {
    id: 2,
    value: "20k+",
    label: "Customers",
    icon: <FaUsers />,
  },
  {
    id: 3,
    value: "25+",
    label: "Years",
    icon: <FaCalendarAlt />,
  },
  {
    id: 4,
    value: "20m+",
    label: "Miles",
    icon: <FaTachometerAlt />,
  },
];

const FactsInNumbers: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.overlay}></div>
          <div className={styles.inner}>
            <div className={styles.header}>
              <h2 className={styles.title}>Facts In Numbers</h2>
              <p className={styles.desc}>
                With over two decades in the mobility industry, we’ve built a
                fleet designed for every journey — from daily commutes to luxury
                getaways. Transparent pricing, reliable vehicles, and
                customer-first service make us the trusted choice for smart car
                rentals.
              </p>
            </div>

            <div className={styles.grid}>
              {stats.map((stat) => (
                <div key={stat.id} className={styles.card}>
                  <div className={styles.iconBox}>{stat.icon}</div>
                  <div className={styles.textBox}>
                    <p className={styles.value}>{stat.value}</p>
                    <p className={styles.label}>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FactsInNumbers;
