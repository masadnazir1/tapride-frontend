"use client";
import type { Metadata } from "next";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./SearchPage.module.css";
import Loader from "@/app/components/ui/Loader/Loader";
import Button from "@/app/components/ui/Button/Button";
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

//

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [searchTerm, setSearchTerm] = useState(query);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [debounced, setDebounced] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(searchTerm), 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    if (!debounced.trim()) {
      setCars([]);
      return;
    }

    const fetchCars = async () => {
      try {
        setLoading(true);
        const res: any = await api.get(
          `/user/cars/search?q=${encodeURIComponent(debounced)}`
        );

        console.log(res);
        setCars(res.cars || []);
      } catch {
        setCars([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [debounced]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <>
      <Head>
        <title>Search Cars for Rent | Tapride</title>
        <meta
          name="description"
          content="Find and book your ideal car for rent in Pakistan with Tapride. Search by brand, model, location, or features to discover affordable, verified rental cars near you."
        />
        <meta
          name="keywords"
          content="car rental Pakistan, rent a car Lahore, rent a car Islamabad, Tapride car booking, affordable car rental, vehicle search Tapride, best car rental app Pakistan, daily car rental Pakistan, self drive car rental, car hire near me"
        />

        <meta property="og:title" content="Search Cars for Rent | Tapride" />
        <meta
          property="og:description"
          content="Easily find your next ride on Tapride. Browse verified rental cars, compare prices, and book instantly across Pakistan."
        />
        <meta
          property="og:image"
          content="https://tapride.galaxydev.pk/images/og/images/og/main-og.jpg"
        />
        <meta property="og:url" content="https://tapride.galaxydev.pk/search" />
        <meta property="og:site_name" content="Tapride" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_PK" />

        <meta name="twitter:card" content="/logo.png" />
        <meta name="twitter:title" content="Search Cars for Rent | Tapride" />
        <meta
          name="twitter:description"
          content="Find cars for rent in Pakistan — fast, verified, and affordable. Search by brand, city, or model with Tapride."
        />
        <meta
          name="twitter:image"
          content="https://tapride.galaxydev.pk/logo.png"
        />

        <link rel="canonical" href="https://tapride.galaxydev.pk/search" />
        <meta name="robots" content="index, follow" />
      </Head>
      <PageHead
        title="Find Your Perfect Ride"
        subtitle="Search across hundreds of cars available for rent near you."
        bgImage="/images/bg.jpg"
        overlay={true}
        overlayColor="rgba(0, 0, 0, 0.75)" // optional light tint
        gradientFrom="transparent"
        gradientTo="transparent"
        height="340px"
      />

      <div className={styles.container}>
        <header className={styles.header}>
          <form className={styles.searchBox} onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search by name, brand, type, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.input}
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
              <h3 style={{ margin: "10px 0" }}>
                {" "}
                Search results found for your query{" "}
                <span style={{ color: "#16db00ff" }}>"{debounced}"</span>{" "}
              </h3>
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
        </div>
      </div>
    </>
  );
}
