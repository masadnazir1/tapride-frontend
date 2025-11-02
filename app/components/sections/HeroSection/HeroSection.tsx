"use client";

import { useEffect, useState } from "react";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";
import styles from "./HeroSection.module.css";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  const images = [
    "/images/hero1.jpg",
    "/images/hero2.jpg",
    "/images/hero3.jpeg",
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCar, setSelectedCar] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5000); // every 5s
    return () => clearInterval(interval);
  }, [images.length]);

  const carOptions = [
    { label: "All Types", value: "All Types" },
    { label: "Toyota Corolla", value: "corolla" },
    { label: "Honda Civic", value: "civic" },
    { label: "Suzuki Swift", value: "swift" },
  ];

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
            <Button onClick={() => router.replace("/cars")}>Book Now</Button>
            <Button onClick={() => router.replace("/about")} variant="outline">
              Learn More
            </Button>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.card}>
            <form className={styles.form}>
              <Input
                label="Select a Car type"
                type="select"
                value={selectedCar}
                onChange={(e) => setSelectedCar(e.target.value)}
                options={carOptions}
                tone="default"
                fullWidth
              />
              <p className={styles.selectedCar}>
                Selected: {selectedCar || "None"}
              </p>

              <Button
                onClick={(e) => {
                  e.preventDefault(),
                    (window.location.href = `/search?q=${
                      selectedCar ? selectedCar : "c"
                    }`);
                }}
              >
                Search Cars
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
