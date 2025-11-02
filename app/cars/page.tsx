"use client";
import CarFilter from "../components/sections/FilterState/CarFilter";
import styles from "./cars.module.css";
import { useEffect, useState } from "react";
import FeaturedCars, {
  Car,
} from "../components/sections/FeaturedCars/FeaturedCars";
import { useRouter } from "next/navigation";

import PageHead from "../components/ui/PageHead/PageHead";
import Button from "../components/ui/Button/Button";
import Input from "../components/ui/Input/Input";
import api from "../utils/api";

export default function Cars() {
  const router = useRouter();

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setsearchTerm] = useState("");

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
      <PageHead
        title="Questions About a Car?"
        subtitle="Our team is here to help you with availability, pricing, or booking any vehicle."
        bgImage="/images/bg.jpg"
        overlay={true}
        overlayColor="rgba(0, 0, 0, 0.75)"
        gradientFrom="transparent"
        gradientTo="transparent"
        height="340px"
      />

      <main className={styles.container}>
        <CarFilter />
        <section className={styles.carscontainer}>
          <section className={styles.FindSection}>
            <div className={styles.searchbox}>
              <Input
                type="search"
                placeholder="Start your day with a smooth ride"
                value={searchTerm}
                onChange={(e) => setsearchTerm(e.target.value)}
              />
            </div>
            <div className={styles.buttonStyles}>
              <Button onClick={() => router.push(`/search?q=${searchTerm}`)}>
                Find
              </Button>
            </div>
          </section>

          <FeaturedCars cars={cars} title="" />

          <div className={styles.ButtonsPreveNext}>
            <Button style={{ width: "20%" }}>Prev</Button>
            <span className={styles.pagenumber}>01/100</span>
            <Button style={{ width: "20%" }}>Next</Button>
          </div>
        </section>
      </main>
    </>
  );
}
