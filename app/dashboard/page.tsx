"use client";
import AccountNavBar from "../components/sections/Accountnavbar/AccountNavBar";
import styles from "./dashboard.module.css";
import Input from "../components/ui/Input/Input";
import Button from "../components/ui/Button/Button";
import { useEffect, useState } from "react";

import FeaturedCars, {
  Car,
} from "../components/sections/FeaturedCars/FeaturedCars";
import Feedback from "../components/AccountSections/Feedback/Feedback";
import api from "../utils/api";

export default function dashboard() {
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
    <>
      <main className={styles.pageRoot}>
        <AccountNavBar />
        <section className={styles.FindSection}>
          <div className={styles.searchbox}>
            <Input
              type="search"
              placeholder="Start your day with a smooth ride"
            />
          </div>
          <div className={styles.buttonStyles}>
            <Button style={{ padding: "15px" }}>Find</Button>
          </div>
        </section>
        <section className={styles.NearBySection}>
          <FeaturedCars
            cars={cars}
            title="Nearby You!"
            onViewAll={() => {
              window.location.href = "/cars";
            }}
          />
        </section>
        <section className={styles.NearBySection}>
          <Feedback />
        </section>
      </main>
    </>
  );
}
