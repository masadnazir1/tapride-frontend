"use client";
import AccountNavBar from "../components/sections/Accountnavbar/AccountNavBar";
import styles from "./dashboard.module.css";
import Input from "../components/ui/Input/Input";
import Button from "../components/ui/Button/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import FeaturedCars, {
  Car,
} from "../components/sections/FeaturedCars/FeaturedCars";
import Feedback from "../components/AccountSections/Feedback/Feedback";
import api from "../utils/api";

export default function dashboard() {
  const router = useRouter();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setsearchTerm] = useState("");
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [relatedLoading, setRelatedLoading] = useState<boolean>(false);

  async function getCars(page: number) {
    try {
      setLoading(true);
      setRelatedLoading(true);
      const response: any = await api.get(
        `/cars?status=available&category=Sedan&page=${page}&limit=2`
      );
      if (response?.success) {
        // Map API data to FeaturedCars structure
        const pages = Math.ceil(response?.count / 4);
        setTotalPage(pages > 0 ? pages : 1);
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
        setRelatedLoading(false);
      }
    } catch (err) {
      console.error("Failed to fetch cars:", err);
      setRelatedLoading(false);
    } finally {
      setLoading(false);
      setRelatedLoading(false);
    }
  }

  useEffect(() => {
    getCars(1);
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
              value={searchTerm}
              onChange={(e) => setsearchTerm(e.target.value)}
            />
          </div>
          <div className={styles.buttonStyles}>
            <Button
              style={{ padding: "15px" }}
              onClick={() => router.push(`/search?q=${searchTerm}`)}
            >
              Find
            </Button>
          </div>
        </section>
        <section className={styles.NearBySection}>
          <FeaturedCars
            cars={cars}
            loading={relatedLoading}
            title="Nearby You!"
            onViewAll={() => {
              window.location.href = "/cars";
            }}
          />
          <div className={styles.ButtonsPreveNext}>
            <Button
              disabled={currentPage === 1}
              onClick={() => {
                const newPage = currentPage - 1;
                setCurrentPage(newPage);
                getCars(newPage);
              }}
              style={{ width: "20%" }}
            >
              Prev
            </Button>
            <span className={styles.pagenumber}>
              Page {currentPage} of {totalPage}
            </span>

            <Button
              disabled={currentPage === totalPage}
              onClick={() => {
                const newPage = currentPage + 1;
                setCurrentPage(newPage);
                getCars(newPage);
              }}
              style={{ width: "20%" }}
            >
              Next
            </Button>
          </div>
        </section>
        <section className={styles.NearBySection}>
          <Feedback />
        </section>
      </main>
    </>
  );
}
