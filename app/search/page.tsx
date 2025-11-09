"use client";
import { Suspense, useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./SearchPage.module.css";
import Loader from "@/app/components/ui/Loader/Loader";
import Button from "@/app/components/ui/Button/Button";
import Input from "../components/ui/Input/Input";
import api from "../utils/api";
import Head from "next/head";
import PageHead from "../components/ui/PageHead/PageHead";

interface Car {
  id: number;
  title: string;
  description: string;
  images: string[];
  brand: string;
  model: string;
  transmission: string;
  fuel_type: string;
  daily_rate: number;
  location: string;
  status: string;
  year: number;
  mileage: number;
}

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState(query);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [debounced, setDebounced] = useState(searchTerm);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(searchTerm), 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const fetchCars = async (page: number) => {
    try {
      setLoading(true);

      const res: any = await api.get(
        `/user/cars/search?q=${encodeURIComponent(
          debounced
        )}&page=${page}&limit=${6}`
      );

      setCars(res.cars || []);
      const pages = res?.pagination?.totalPages;
      setTotalPage(pages > 0 ? pages : 1);
    } catch {
      setCars([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!debounced.trim()) {
      setCars([]);
      return;
    }

    fetchCars(1);
  }, [debounced]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCars(1);
  };

  return (
    <>
      <Head>
        <title>Search Cars for Rent | TapRide.pk</title>
        <meta
          name="description"
          content="Find and book your ideal car for rent in Pakistan with TapRide.pk. Search by brand, model, or location to discover affordable, verified rental cars."
        />
        <meta
          name="keywords"
          content="car rental Pakistan, rent a car Lahore, rent a car Islamabad, TapRide, car booking Pakistan, daily rental cars, car hire Pakistan, self drive car rental"
        />
        <meta property="og:title" content="Search Cars for Rent | TapRide.pk" />
        <meta
          property="og:description"
          content="Easily find verified cars for rent across Pakistan. Search by brand, city, or model — TapRide.pk makes renting simple."
        />
        <meta
          property="og:image"
          content="https://tapride.galaxydev.pk/images/og/search-page.jpg"
        />
        <meta property="og:url" content="https://tapride.galaxydev.pk/search" />
        <meta property="og:site_name" content="TapRide.pk" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_PK" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Search Cars for Rent | TapRide.pk"
        />
        <meta
          name="twitter:description"
          content="Find verified cars for rent across Pakistan. Affordable, fast, and reliable — TapRide.pk."
        />
        <meta
          name="twitter:image"
          content="https://tapride.galaxydev.pk/images/og/search-page.jpg"
        />
        <link rel="canonical" href="https://tapride.galaxydev.pk/search" />
        <meta name="robots" content="index, follow" />
      </Head>

      <PageHead
        title="Find Your Perfect Ride"
        subtitle="Search across hundreds of verified cars available for rent near you."
        bgImage="/images/bg.jpg"
        overlay
        overlayColor="rgba(0,0,0,0.75)"
        gradientFrom="transparent"
        gradientTo="transparent"
        height="340px"
      />

      <div className={styles.container}>
        <header className={styles.header}>
          <form className={styles.searchBox} onSubmit={handleSearchSubmit}>
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search by name, brand, type, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button style={{ width: "100px" }} variant="solid">
              Search
            </Button>
          </form>
        </header>

        <div className={styles.results}>
          {loading ? (
            <Loader />
          ) : cars.length === 0 && debounced ? (
            <p className={styles.empty}>
              No cars found matching “{debounced}”.
            </p>
          ) : (
            <div>
              {debounced && (
                <h3 style={{ margin: "10px 0" }}>
                  Results for{" "}
                  <span style={{ color: "#16db00" }}>{debounced}</span>
                </h3>
              )}
              <div className={styles.grid}>
                {cars.map((car) => (
                  <div key={car.id} className={styles.card}>
                    <div className={styles.imageWrapper}>
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}${car.images?.[0]}`}
                        alt={car.title}
                        className={styles.image}
                      />
                    </div>
                    <div className={styles.info}>
                      <h3>{car.title}</h3>
                      <p className={styles.meta}>
                        {car.brand} • {car.model} • {car.year}
                      </p>
                      <p className={styles.rate}>PKR {car.daily_rate}/day</p>
                      <Button
                        variant="outline"
                        onClick={() => router.push(`/car-details/${car.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={styles.ButtonsPreveNext}>
            <Button
              disabled={currentPage === 1}
              onClick={() => {
                const newPage = currentPage - 1;
                setCurrentPage(newPage);
                fetchCars(newPage);
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
                fetchCars(newPage);
              }}
              style={{ width: "20%" }}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

// Suspense wrapper — required for useSearchParams()
export default function SearchPage() {
  return (
    <Suspense fallback={<Loader />}>
      <SearchPageContent />
    </Suspense>
  );
}
