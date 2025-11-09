"use client";
import CarFilter, {
  CarFilterRef,
} from "../components/sections/FilterState/CarFilter";
import styles from "./cars.module.css";
import { useEffect, useState, useRef } from "react";
import FeaturedCars, {
  Car,
} from "../components/sections/FeaturedCars/FeaturedCars";
import { useRouter } from "next/navigation";

import PageHead from "../components/ui/PageHead/PageHead";
import Button from "../components/ui/Button/Button";
import Input from "../components/ui/Input/Input";
import api from "../utils/api";
import Image from "next/image";

interface FilterState {
  fuelType: string;
  priceMin: number;
  priceMax: number;
  location: string;
  vehicleType: string;
  bodyType: string;
  acType: string;
}

export default function Cars() {
  const router = useRouter();
  const filterRef = useRef<CarFilterRef>(null);

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setsearchTerm] = useState("");
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    fuelType: "petrol",
    priceMin: 2000,
    priceMax: 10000,
    location: "rawalpindi",
    vehicleType: "car",
    bodyType: "sedan",
    acType: "yes",
  });

  useEffect(() => {
    if (window.innerWidth < 924) {
      setShowFilters(false);
    } else if (window.innerWidth > 924) {
      setShowFilters(true);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth < 924) {
        setShowFilters(false);
      } else if (window.innerWidth > 924) {
        setShowFilters(true);
      }
    });
  }, []);

  const handleResteFilters = () => {
    filterRef.current?.resetFilter();
  };

  const handleFilterChange = (ReceivedFilters: FilterState) => {
    setFilters((prev) => ({
      ...prev,
      ...ReceivedFilters,
    }));
  };

  async function getCars(page: number) {
    try {
      var acBoolean = filters.acType === "yes" ? true : false;

      setLoading(true);
      const response: any = await api.get(
        `/cars?status=available&category=${
          filters?.bodyType || "Sedan"
        }&page=${page}&limit=4&fuel=${filters?.fuelType || "petrol"}&minPrice=${
          filters.priceMin
        }&maxPrice=${filters.priceMax}&location=${
          filters.location || "rawalpindi"
        }&ac=${acBoolean}`
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
      }
    } catch (err) {
      console.error("Failed to fetch cars:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCars(1);
  }, [filters]);

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
        {showFilters && (
          <div className={styles.FilterSection}>
            <CarFilter ref={filterRef} onFilterChange={handleFilterChange} />
          </div>
        )}

        <section className={styles.carscontainer}>
          <section className={styles.FindSection}>
            <div className={styles.searchbox}>
              <Input
                type="search"
                placeholder="Start your day with a smooth ride"
                value={searchTerm}
                onChange={(e) => setsearchTerm(e.target.value)}
              />
              <div className={styles.MobileFilterWrapper}>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  style={{ padding: "1px", maxWidth: "100px", border: "none" }}
                >
                  <Image
                    src="/icons/filter.png"
                    alt="car filter "
                    width={50}
                    height={50}
                    className={styles.filterIcon}
                  />
                </Button>
              </div>
            </div>
            <div className={styles.buttonStyles}>
              <Button
                onClick={() => router.push(`/search?q=${searchTerm}`)}
                style={{ padding: "18px", maxWidth: "100px" }}
              >
                Find
              </Button>
            </div>
          </section>

          <FeaturedCars cars={cars} title="" onReSet={handleResteFilters} />

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
      </main>
    </>
  );
}
