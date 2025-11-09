"use client";
import React from "react";
import styles from "./FeaturedCars.module.css";
import { useState } from "react";
import Button from "../../ui/Button/Button";
import { useUser } from "@/app/context/UserContext";
import CarCardSkeleton from "../../Skeleton/CarCardSkeleton/CarCardSkeleton";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import api from "@/app/utils/api";
import {
  FaCogs,
  FaFan,
  FaGasPump,
  FaChair,
  FaHeart,
  FaDoorClosed,
} from "react-icons/fa";
import axios from "axios";
import Loader from "../../ui/Loader/Loader";

export interface CarFeature {
  name: string;
  icon: React.ReactNode;
}

export interface Car {
  id: number;
  dealer_id: number;
  name: string;
  description: string;
  images: string[];
  daily_rate: string | number;
  fuel: string;
  transmission: string;
  seats: number;
  doors: number;
  ac: boolean;
  badge?: string;
  location?: string;
}

interface FeaturedCarsProps {
  title?: string;
  viewAllLabel?: string;
  onViewAll?: () => void;
  cars: Car[];
  buttonText?: string;
  gridCols?: 2 | 3 | 4;
  showButton?: boolean;
  outlineButton?: boolean;
  showSave?: boolean;
  loading?: boolean;
  onReSet?: () => void;
}

const FeaturedCars: React.FC<FeaturedCarsProps> = ({
  title = "Choose the car that suits you",
  viewAllLabel = "View All",
  onViewAll,
  cars,
  buttonText = "View Details",
  gridCols = 3,
  showButton = true,
  outlineButton = false,
  loading = false,
  showSave = true,
  onReSet,
}) => {
  const router = useRouter();
  const { user } = useUser();
  const [isloading, setisloading] = useState(loading);

  async function handleToggleSave(carId: number) {
    if (!user) {
      window.location.href = "/login";
      return;
    }
    setisloading(true);
    await api
      .post("/saved/save", {
        userId: user?.id,
        carId: carId,
      })
      .then((data: any) => {
        toast.success(data.message);
      })
      .catch((err: any) => {
        if (axios.isAxiosError(err)) {
          if (err.status === 400) {
            api
              .delete("/saved/", {
                userId: user?.id,
                carId: carId,
              })
              .then((res: any) => {
                toast.success(res.message);
              });
          }
        }
      });

    setisloading(false);
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {onViewAll && (
            <button className={styles.viewAll} onClick={onViewAll}>
              {viewAllLabel}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                className={styles.arrow}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          )}
        </div>

        <div
          className={`${styles.grid} ${
            gridCols === 2
              ? styles.twoCols
              : gridCols === 4
              ? styles.fourCols
              : styles.threeCols
          }`}
        >
          {isloading
            ? [...Array(gridCols * 2)].map((_, idx) => (
                <CarCardSkeleton key={idx} />
              ))
            : cars.length > 0 &&
              cars.map((car) => {
                // Build features dynamically
                const features: CarFeature[] = [
                  { name: car.transmission, icon: <FaCogs /> },
                  { name: car.fuel, icon: <FaGasPump /> },
                  { name: car.ac ? "AC" : "No AC", icon: <FaFan /> },
                  { name: `${car.seats} Seats`, icon: <FaChair /> },
                  { name: `${car.doors} Doors`, icon: <FaDoorClosed /> },
                ];

                return (
                  <div key={car.id} className={styles.card}>
                    <div className={styles.imageWrapper}>
                      <img
                        src={car?.images[0]}
                        alt={car.name}
                        className={styles.image}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/images/defaultcar.png";
                        }}
                      />
                    </div>

                    <div className={styles.content}>
                      <div className={styles.topRow}>
                        <div>
                          <h3 className={styles.make}>{car.name}</h3>
                          <p className={styles.type}>{car.badge || ""}</p>
                        </div>
                        <div className={styles.price}>
                          <p>${car.daily_rate}</p>
                          <span>per day</span>
                        </div>
                      </div>

                      <hr className={styles.divider} />

                      <div className={styles.features}>
                        {features.map((f, idx) => (
                          <div key={idx} className={styles.feature}>
                            {f.icon}
                            <span>{f.name}</span>
                          </div>
                        ))}
                      </div>

                      {showButton && (
                        <>
                          <div className={styles.ButtonsWrapper}>
                            <Button
                              onClick={() =>
                                router.push(`/car-details/${car.id}`)
                              }
                            >
                              {buttonText}
                            </Button>

                            {showSave && (
                              <Button
                                variant="outline"
                                disabled={isloading}
                                onClick={() => handleToggleSave(car.id)}
                                style={{ width: "100px" }}
                              >
                                {isloading ? (
                                  <Loader color="#fff" />
                                ) : (
                                  <FaHeart size="30px" />
                                )}
                              </Button>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}

          {cars && cars.length < 1 && (
            <>
              <div className={styles.NoCarMessageContainer}>
                <h2 className={styles.NoCarTitle}>
                  No cars match your current filters
                </h2>
                <p className={styles.NoCarText}>
                  We couldn’t find any available cars based on your selected
                  options. Try adjusting your filters — such as fuel type, price
                  range, or vehicle category — to see more results.
                </p>
                <Button onClick={onReSet} style={{ maxWidth: "150px" }}>
                  Reset Filters
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
