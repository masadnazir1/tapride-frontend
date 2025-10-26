import React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "./DownloadApp.module.css";

const DownloadApp: React.FC = () => {
  return (
    <>
      <Head>
        <title>TapRide - Book Your Ride Instantly</title>
        <meta
          name="description"
          content="TapRide app makes renting a car effortless and convenient. Browse vehicles, book instantly, and enjoy flexible rental periods with 24/7 support."
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="TapRide, car rental, book car, rent a car, taxi app, car booking"
        />
        <meta
          property="og:title"
          content="TapRide - Book Your Ride Instantly"
        />
        <meta
          property="og:description"
          content="TapRide app makes renting a car effortless and convenient. Browse vehicles, book instantly, and enjoy flexible rental periods with 24/7 support."
        />
      </Head>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Column 1: Text Content & Buttons */}
            <div className={styles.textColumn}>
              <h1 className={styles.heading}>
                Book Your Ride Instantly with TapRide
              </h1>
              <p className={styles.description}>
                TapRide makes renting a car effortless and convenient. Browse a
                wide range of vehicles, choose your preferred ride, and book it
                in seconds. Whether it’s for a quick city trip or a long
                journey, TapRide ensures a smooth and reliable driving
                experience. Enjoy transparent pricing, flexible rental periods,
                and 24/7 support at your fingertips.
              </p>

              <div className={styles.buttons}>
                <a
                  href="#"
                  className={styles.buttonLink}
                  title="Download on the App Store"
                >
                  <Image
                    src="/icons/appstore.png"
                    alt="Download on the App Store"
                    width={162}
                    height={48}
                    className={styles.buttonImage}
                  />
                </a>
                <a
                  href="#"
                  className={styles.buttonLink}
                  title="Get it on Google Play"
                >
                  <Image
                    src="/icons/plystore.png"
                    alt="Get it on Google Play"
                    width={162}
                    height={48}
                    className={styles.buttonImage}
                  />
                </a>
              </div>
            </div>

            {/* Column 2: Phone Mockups */}
            <div className={styles.phoneColumn}>
              <div className={styles.phoneBack}>
                <div className={styles.phoneScreenBack} />
              </div>
              <div className={styles.phoneFront}>
                <div className={styles.phoneScreenFront} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DownloadApp;
