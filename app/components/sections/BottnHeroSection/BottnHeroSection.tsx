import React, { useState } from "react";
import Head from "next/head";
import styles from "./BottnHeroSection.module.css";

const BottnHeroSection: React.FC = () => {
  const [city, setCity] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for cars in:", city);
    // router.push(`/search?city=${city}`); // Add navigation logic
  };

  return (
    <>
      <Head>
        <title>TapRide - Rent a Car Instantly</title>
        <meta
          name="description"
          content="TapRide makes renting a car effortless. Browse vehicles, book instantly, and enjoy flexible rental periods with 24/7 support."
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="TapRide, car rental, rent a car, book car, taxi app, car booking"
        />
        <meta property="og:title" content="TapRide - Rent a Car Instantly" />
        <meta
          property="og:description"
          content="TapRide makes renting a car effortless. Browse vehicles, book instantly, and enjoy flexible rental periods with 24/7 support."
        />
      </Head>

      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Column 1: Text + Search */}
            <div className={styles.textColumn}>
              <h1 className={styles.heading}>
                Enjoy every mile with{" "}
                <span className={styles.highlight}>TapRide</span>
              </h1>
              <p className={styles.description}>
                TapRide makes renting a car effortless and convenient. Browse a
                wide range of vehicles, choose your preferred ride, and book it
                in seconds. Whether it’s for a quick city trip or a long
                journey, TapRide ensures a smooth and reliable driving
                experience. Transparent pricing, flexible rental periods, and
                24/7 support at your fingertips.
              </p>

              <form
                onSubmit={handleSearch}
                className={styles.searchForm}
                aria-label="Search for cars by city"
              >
                <input
                  type="text"
                  placeholder="Enter City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={styles.searchInput}
                  aria-label="City name"
                  required
                />
                <button type="submit" className={styles.searchButton}>
                  Search
                </button>
              </form>
            </div>

            {/* Column 2: Car Graphic */}
            <div className={styles.graphicColumn} aria-hidden="true">
              <svg
                viewBox="0 0 500 300"
                className={styles.carGraphic}
                fill="white" // <-- change here
              >
                <path
                  d="M480 180c-5.5 0-10 4.5-10 10v40h-20v-40c0-5.5-4.5-10-10-10H80c-5.5 0-10 4.5-10 10v40H50v-40c0-5.5-4.5-10-10-10H20c-5.5 0-10 4.5-10 10v60c0 5.5 4.5 10 10 10h460c5.5 0 10-4.5 10-10v-60c0-5.5-4.5-10-10-10zm-440 20c0-5.5 4.5-10 10-10h40c5.5 0 10 4.5 10 10v20c0 5.5-4.5 10-10 10H40c-5.5 0-10-4.5-10-10v-20zM400 200c0-5.5 4.5-10 10-10h40c5.5 0 10 4.5 10 10v20c0 5.5-4.5 10-10 10h-40c-5.5 0-10-4.5-10-10v-20zM360 180h-220c-10 0-18 6-20 16l-30 80h300l-30-80c-2-10-10-16-20-16zm-170-40h130c5.5 0 10-4.5 10-10s-4.5-10-10-10h-130c-5.5 0-10 4.5-10 10s4.5 10 10 10zM350 140h-20c-5.5 0-10 4.5-10 10s4.5 10 10 10h20c5.5 0 10-4.5 10-10s-4.5-10-10-10zM170 140h-20c-5.5 0-10 4.5-10 10s4.5 10 10 10h20c5.5 0 10-4.5 10-10s-4.5-10-10-10zM420 180h-20c-5.5 0-10 4.5-10 10s4.5 10 10 10h20c5.5 0 10-4.5 10-10s-4.5-10-10-10z"
                  className={styles.carPath}
                />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BottnHeroSection;
