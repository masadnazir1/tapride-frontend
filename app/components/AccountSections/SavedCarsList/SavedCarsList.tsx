"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "../../ui/Button/Button";
import Loader from "../../ui/Loader/Loader";
import styles from "./SavedCarsList.module.css";
import api from "@/app/utils/api";
import { useUser } from "@/app/context/UserContext";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export interface CarItem {
  id: number;
  user_id: number;
  car_id: number;
  created_at: string;
  car_name: string;
  images: string[];
  daily_rate: string;
  status: string;
}

interface SavedCarsListProps {
  userId: number;
  title?: string;
  onCarClick?: (car: CarItem) => void;
}

export default function SavedCarsList({
  title,
  onCarClick,
}: SavedCarsListProps) {
  const router = useRouter();
  const { user } = useUser();
  const [cars, setCars] = useState<CarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchSavedCars = async () => {
    try {
      setLoading(true);
      const res: any = await api.get(`/saved/${user?.id}`);
      console.log(res);
      setCars(res.data || []);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.status === 404) {
          setError("No saved cars found.");
        }
      } else {
        setError("Failed to load saved cars.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (carId: number) => {
    try {
      console.log(user?.id, carId);
      setRemovingId(carId);
      await api.delete("/saved/", { userId: user?.id, carId });
      toast.success("Car removed from saved list.");
      setCars((prev) => prev.filter((c) => c.car_id !== carId));
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove car.");
    } finally {
      setRemovingId(null);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchSavedCars();
    }
  }, [user?.id]);

  if (loading) return <Loader />;
  if (error) return <div className={styles.error}>{error}</div>;
  if (cars.length < 0) return <div className={styles.empty}>{error}</div>;

  return (
    <div>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.grid}>
        {cars.map((car) => (
          <div key={car.id} className={styles.card}>
            <div
              className={styles.imageWrapper}
              style={{ cursor: onCarClick ? "pointer" : "default" }}
            >
              <div className={styles.removeButtonBox}>
                <Button
                  variant="ghost"
                  tone="danger"
                  disabled={removingId === car.car_id}
                  onClick={() => handleRemove(car.car_id)}
                >
                  <FaTrash color="#fff" />
                </Button>
              </div>
              <img
                src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}${car.images[0]}`}
                alt={car.car_name}
                className={styles.image}
              />
            </div>
            <div className={styles.info}>
              <h3 className={styles.name}>{car.car_name}</h3>
              <p className={styles.rate}>PKR {car.daily_rate}/day</p>
              <p className={styles.status}>
                Status:{" "}
                <span
                  className={
                    car.status === "available"
                      ? styles.available
                      : styles.unavailable
                  }
                >
                  {car.status}
                </span>
              </p>

              <Button
                variant="solid"
                disabled={removingId === car.car_id}
                onClick={() => router.push(`/car-details/${car.car_id}`)}
              >
                Rent it Now
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
