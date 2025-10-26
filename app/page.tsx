"use client";

import styles from "./page.module.css";
import HeroSection from "./components/sections/HeroSection/HeroSection";
import Navbar from "./components/sections/Navbar/Navbar";
import FeatureRow from "./components/sections/FeatureRow/FeatureRow";
import ScrollToTop from "./components/sections/ScrollToTop/ScrollToTop";
import CarBookingSteps from "./components/sections/CarBookingSteps/CarBookingSteps";
import FeaturedCars, {
  Car,
} from "./components/sections/FeaturedCars/FeaturedCars";
import { FaGasPump, FaFan, FaCogs } from "react-icons/fa";
import FactsInNumbers from "./components/sections/FactsInNumbers/FactsInNumbers";
import DownloadApp from "./components/sections/DownloadApp/DownloadApp";
import BottnHeroSection from "./components/sections/BottnHeroSection/BottnHeroSection";

const cars: Car[] = [
  {
    id: 1,
    make: "Toyota",
    type: "SUV",
    pricePerDay: 40,
    imageUrl: "/logo.png",
    features: [
      { name: "Automatic", icon: <FaCogs /> },
      { name: "Petrol", icon: <FaGasPump /> },
      { name: "Air Con", icon: <FaFan /> },
    ],
  },
  {
    id: 2,
    make: "Toyota",
    type: "SUV",
    pricePerDay: 40,
    imageUrl: "/logo.png",
    features: [
      { name: "Automatic", icon: <FaCogs /> },
      { name: "Petrol", icon: <FaGasPump /> },
      { name: "Air Con", icon: <FaFan /> },
    ],
  },
  {
    id: 3,
    make: "Toyota",
    type: "SUV",
    pricePerDay: 40,
    imageUrl: "/logo.png",
    features: [
      { name: "Automatic", icon: <FaCogs /> },
      { name: "Petrol", icon: <FaGasPump /> },
      { name: "Air Con", icon: <FaFan /> },
    ],
  },
  {
    id: 4,
    make: "Toyota",
    type: "SUV",
    pricePerDay: 40,
    imageUrl: "/logo.png",
    features: [
      { name: "Automatic", icon: <FaCogs /> },
      { name: "Petrol", icon: <FaGasPump /> },
      { name: "Air Con", icon: <FaFan /> },
    ],
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <HeroSection />
      <main className={styles.main}>
        <FeatureRow />
        <CarBookingSteps />
        <FeaturedCars
          cars={cars}
          onViewAll={() => {
            console.log("Ok boss");
          }}
        />
        <FactsInNumbers />
        <DownloadApp />
        <BottnHeroSection />
        <ScrollToTop />
      </main>
    </div>
  );
}
