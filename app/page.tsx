"use client";

import styles from "./page.module.css";
import HeroSection from "./components/sections/HeroSection/HeroSection";
import FeatureRow from "./components/sections/FeatureRow/FeatureRow";
import ScrollToTop from "./components/sections/ScrollToTop/ScrollToTop";
import CarBookingSteps from "./components/sections/CarBookingSteps/CarBookingSteps";
import { useRouter } from "next/navigation";
import FeaturedCars, {
  Car,
} from "./components/sections/FeaturedCars/FeaturedCars";
import FactsInNumbers from "./components/sections/FactsInNumbers/FactsInNumbers";
import DownloadApp from "./components/sections/DownloadApp/DownloadApp";
import BottnHeroSection from "./components/sections/BottnHeroSection/BottnHeroSection";
import api from "./utils/api";
import { useEffect, useState } from "react";

export default function Home() {
  const rouer = useRouter();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  async function getCars() {
    try {
      setLoading(true);
      const response: any = await api.get(
        "/cars?status=available&category=Sedan&page=1&limit=10"
      );

      if (response?.success) {
        // Map API data to FeaturedCars structure

        const mappedCars: Car[] = response.cars.map((c: any) => ({
          id: c.id,
          dealer_id: c.dealer_id,
          name: c.name,
          description: c.description,
          images: c.images || [],
          daily_rate: Number(c.daily_rate),
          fuel: c.fuel,
          transmission: c.transmission,
          seats: c.seats,
          doors: c.doors,
          ac: c.ac,
          badge: c.badge,
          location: c.location,
        }));
        setCars(mappedCars);
      }
    } catch (err) {
      console.error("Failed to fetch cars:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCars();
  }, []);

  return (
    <div className={styles.page}>
      <HeroSection />
      <main className={styles.main}>
        <FeatureRow />
        <CarBookingSteps />
        <FeaturedCars
          cars={cars}
          onViewAll={() => {
            rouer.replace("/cars");
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
