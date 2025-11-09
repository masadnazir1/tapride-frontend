"use client";

import styles from "./carDetails.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import CarDetailsSkeleton from "@/app/components/Skeleton/CarDetailsSkeleton/CarDetailsSkeleton";
import FeaturedCars, {
  Car,
} from "../../components/sections/FeaturedCars/FeaturedCars";
import Button from "../../components/ui/Button/Button";
import api from "../../utils/api";

import {
  FaGasPump,
  FaSnowflake,
  FaCogs,
  FaCarSide,
  FaDoorClosed,
  FaRuler,
} from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";

interface ApiCar {
  id: number;
  dealer_id: number;
  brand_id: number;
  category_id: number;
  name: string;
  description: string;
  images: string[];
  badge: string;
  seats: number;
  doors: number;
  transmission: string;
  fuel: string;
  daily_rate: string;
  status: string;
  location: string;
  ac: boolean;
  year: number;
  mileage: number;
}

export default function CarDetails() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [car, setCar] = useState<ApiCar | null>(null);
  const [relatedCars, setRelatedCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [relatedLoading, setRelatedLoading] = useState<boolean>(false);
  const [imageSlider, setImageSlider] = useState<string[]>([]);
  const [sliderMain, setSliderMain] = useState<string>("");
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const setSliderImage = (src: string) => setSliderMain(src);

  async function getCarById() {
    try {
      setLoading(true);
      const response: any = await api.get(`/cars/${id}`);

      if (response?.success && response?.car) {
        const carData: ApiCar = response.car;
        setCar(carData);
        setImageSlider(carData.images || []);
        setSliderMain(carData.images?.[0] || "");
      }
    } catch (err) {
      console.error("Failed to fetch car by id:", err);
    } finally {
      setLoading(false);
    }
  }

  async function getRelatedCars(page: number) {
    try {
      setRelatedLoading(true);
      const response: any = await api.get(
        `/cars?status=available&category=Sedan&${page}=1&limit=3`
      );

      if (response?.success && response?.cars?.length) {
        const pages = Math.ceil(response?.count / 4);
        setTotalPage(pages > 0 ? pages : 1);
        const mappedCars: Car[] = response.cars.map((c: any) => ({
          id: c.id,
          dealer_id: c.dealer_id,
          make: c.name,
          type: c.fuel,
          daily_rate: Number(c.daily_rate),
          images: c.images || [],
          features: [
            { name: c.transmission, icon: <FaCogs /> },
            { name: c.fuel, icon: <FaGasPump /> },
            { name: c.ac ? "AC" : "No AC", icon: <FaSnowflake /> },
          ],
        }));

        setRelatedCars(mappedCars);

        setRelatedLoading(false);
      }
    } catch (err) {
      console.error("Failed to fetch related cars:", err);
      setRelatedCars([]);
      setRelatedLoading(false); // always reset loading state
    } finally {
      setRelatedLoading(false); // always reset loading state
    }
  }

  useEffect(() => {
    getCarById();
    getRelatedCars(1);
  }, [id]);

  useEffect(() => {
    if (!imageSlider.length) return;

    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % imageSlider.length;
      setSliderMain(imageSlider[index]);
    }, 5000);

    return () => clearInterval(interval);
  }, [imageSlider]);

  if (loading || !car)
    return (
      <>
        <div style={{ margin: "5rem 2rem" }}>
          <CarDetailsSkeleton />
        </div>
      </>
    );

  return (
    <div className={styles.Container}>
      <section className={styles.maindetailsSection}>
        <div className={styles.leftImagesSlides}>
          <img
            src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}${sliderMain}`}
            alt={car.name}
            width={1000}
            height={300}
            className={styles.mainImage}
          />

          <div className={styles.imagesLine}>
            {imageSlider.map((img, index) => (
              <img
                key={index}
                src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}${img}`}
                alt="thumbnail"
                width={100}
                height={200}
                className={styles.smallImage}
                onClick={() => setSliderImage(img)}
              />
            ))}
          </div>
        </div>

        <div className={styles.rightSpectOverview}>
          <h3>{car.name}</h3>
          <p>{car.description}</p>

          <span className={styles.specTitle}>Technical Specifications</span>
          <div className={styles.boxContainer}>
            <div className={styles.boxes}>
              <FaCogs /> Transmission: {car.transmission}
            </div>
            <div className={styles.boxes}>
              <FaGasPump /> Fuel: {car.fuel}
            </div>
            <div className={styles.boxes}>
              <BsFillPeopleFill /> Seats: {car.seats}
            </div>
            <div className={styles.boxes}>
              <FaDoorClosed /> Doors: {car.doors}
            </div>
            <div className={styles.boxes}>
              <FaSnowflake /> AC: {car.ac ? "Yes" : "No"}
            </div>
            <div className={styles.boxes}>
              <FaRuler /> Mileage: {car.mileage} km
            </div>
            <div className={styles.boxes}>
              <FaCarSide /> Year: {car.year}
            </div>
          </div>
          <div className={styles.boxes}>
            <FaCarSide /> Location: {car.location}
          </div>

          <div className={styles.RenTnowSection}>
            <Button onClick={() => router.push(`/booking/${car.id}`)}>
              Rent Now – PKR {car.daily_rate}/day
            </Button>
          </div>
        </div>
      </section>

      <section className={styles.related}>
        <FeaturedCars
          cars={relatedCars}
          title="We have selected more Related"
          onViewAll={() => router.replace("/cars")}
          loading={relatedLoading}
        />
        <div className={styles.ButtonsPreveNext}>
          <Button
            disabled={currentPage === 1}
            onClick={() => {
              const newPage = currentPage - 1;
              setCurrentPage(newPage);
              getRelatedCars(newPage);
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
              getRelatedCars(newPage);
            }}
            style={{ width: "20%" }}
          >
            Next
          </Button>
        </div>
      </section>
    </div>
  );
}
