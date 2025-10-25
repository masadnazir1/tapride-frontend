"use client";

import { useEffect, useState } from "react";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const images = [
    "/images/hero1.jpg",
    "/images/hero2.jpg",
    "/images/hero3.jpeg",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5000); // every 5s
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className={styles.hero}>
      {/* Background Carousel */}
      <div className={styles.carousel}>
        {images.map((src, index) => (
          <div
            key={index}
            className={`${styles.slide} ${
              index === activeIndex ? styles.active : ""
            }`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
        <div className={styles.overlay}></div>
      </div>

      {/* Content */}
      <div className={styles.container}>
        <div className={styles.left}>
          <h1>Book Your Perfect Ride</h1>
          <p>
            Fast, affordable, and reliable car rental across Pakistan. Get
            behind the wheel in minutes.
          </p>
          <div className={styles.buttons}>
            <Button>Book Now</Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.card}>
            <form className={styles.form}>
              <Input
                type="text"
                placeholder="Enter city or location"
                label="Pickup Location"
                required
              />

              <div className={styles.row}>
                <Input type="date" label="Pickup Date" required />
                <Input type="date" label="Return Date" required />
              </div>

              <div className={styles.field}>
                <label>Car Type</label>
                <select className={styles.select}>
                  <option>All Types</option>
                  <option>Economy</option>
                  <option>SUV</option>
                  <option>Luxury</option>
                </select>
              </div>

              <Button type="submit">Search Cars</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
