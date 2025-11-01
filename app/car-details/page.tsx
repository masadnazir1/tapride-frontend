"use client";

import Image from "next/image";
import styles from "./carDetails.module.css";
import { useEffect, useState } from "react";
import FeaturedCars, {
  Car,
} from "../components/sections/FeaturedCars/FeaturedCars";
import { FaCogs, FaFan, FaGasPump } from "react-icons/fa";
import Button from "../components/ui/Button/Button";
import api from "../utils/api";

export default function () {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  async function getCars() {
    try {
      setLoading(true);
      const response: any = await api.get(
        "/cars?status=available&category=Sedan&page=1&limit=10"
      );
      console.log(response.cars);
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
      <div className={styles.Container}>
        <section className={styles.maindetailsSection}>
          <div className={styles.leftImagesSlides}>
            <Image
              src="/logo.png"
              alt="tapride"
              width={1000}
              height={300}
              className={styles.mainImage}
            />
            <div className={styles.imagesLine}>
              <Image
                src="/logo.png"
                alt="tapride"
                width={100}
                height={200}
                className={styles.smallImage}
              />
              <Image
                src="/logo.png"
                alt="tapride"
                width={100}
                height={200}
                className={styles.smallImage}
              />
              <Image
                src="/logo.png"
                alt="tapride"
                width={100}
                height={200}
                className={styles.smallImage}
              />
            </div>
          </div>
          <div className={styles.rightSpectOverview}>
            <span>Technical Specification</span>
            <div className={styles.boxContainer}>
              {[1, 2, 3, 4, 5, 6].map((id, idx) => (
                <div key={idx} className={styles.boxes}>
                  Box
                </div>
              ))}
            </div>
            <div className={styles.RenTnowSection}>
              <Button>Ren it Now</Button>
            </div>
          </div>
        </section>

        <section className={styles.related}>
          <h5></h5>
          <FeaturedCars
            cars={cars}
            onViewAll={() => {
              console.log("Ok boss");
            }}
          />
        </section>
      </div>
    </>
  );
}
