"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import Button from "../../components/ui/Button/Button";
import Loader from "@/app/components/ui/Loader/Loader";
import Input from "@/app/components/ui/Input/Input";
import api from "../../utils/api";
import {
  FaGasPump,
  FaSnowflake,
  FaCogs,
  FaCarSide,
  FaDoorClosed,
} from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import styles from "./BookingPage.module.css";
import { useUser } from "@/app/context/UserContext";
import axios from "axios";

interface ApiCar {
  id: number;
  name: string;
  description: string;
  images: string[];
  seats: number;
  doors: number;
  transmission: string;
  fuel: string;
  daily_rate: string;
  ac: boolean;
  location: string;
  year: number;
  mileage: number;
  dealer_id: number;
}

export default function BookingPage() {
  const router = useRouter();
  const { user } = useUser();
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<ApiCar | null>(null);
  const [sliderMain, setSliderMain] = useState("");
  const [imageSlider, setImageSlider] = useState<string[]>([]);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [isBooking, setisBooking] = useState(false);

  async function fetchCar() {
    try {
      const response: any = await api.get(`/cars/${id}`);
      if (response?.success) {
        setCar(response.car);
        setImageSlider(response.car.images);
        setSliderMain(response.car.images[0]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchCar();
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

  async function createBooking() {
    if (
      !dropoffDate ||
      !pickupDate ||
      !dropoff ||
      !pickup ||
      !user?.id ||
      !car
    ) {
      toast.error("Please fill the form");

      return;
    }

    const pickupTime = new Date(pickupDate).getTime();
    const dropoffTime = new Date(dropoffDate).getTime();

    if (dropoffTime <= pickupTime) {
      toast.error("Drop-off date must be later than pickup date.");
      return;
    }

    try {
      setisBooking(true);
      await api.post("/bookings/create", {
        startDate: pickupDate,
        endDate: dropoffDate,
        pickupLocation: pickup,
        dropoffLocation: dropoff,
        carId: car?.id,
        renterId: user?.id,
        dealerId: car?.dealer_id,
      });
      setisBooking(false);
    } catch (err: any) {
      setisBooking(false);

      // Handle Axios errors specifically
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          // Conflict: already booked
          toast.error("You already have a pending or confirmed booking.");
          router.replace("/dashboard/bookings");
        } else if (err.response) {
          // Other server-side errors
          toast.error(`Booking failed: ${err.response.statusText}`);
        } else {
          // No response (network error)
          toast.error("Network error. Please try again.");
        }
      } else {
        // Other unexpected errors
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setisBooking(false);
    }
  }

  if (!car)
    return (
      <div style={{ textAlign: "center", marginTop: "5rem" }}>Loading...</div>
    );

  return (
    <div className={styles.Container}>
      <section className={styles.leftSection}>
        <Image
          src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}${sliderMain}`}
          alt={car.name}
          width={1000}
          height={400}
          className={styles.mainImage}
        />
        <div className={styles.thumbnailLine}>
          {imageSlider.map((img, idx) => (
            <Image
              key={idx}
              src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}${img}`}
              alt="thumbnail"
              width={80}
              height={80}
              className={styles.thumbnail}
              onClick={() => setSliderMain(img)}
            />
          ))}
        </div>
        <div className={styles.carSpecs}>
          <h2>{car.name}</h2>
          <p>{car.description}</p>
          <div className={styles.specGrid}>
            <div className={styles.specBox}>
              <FaCogs /> {car.transmission}
            </div>
            <div className={styles.specBox}>
              <FaGasPump /> {car.fuel}
            </div>
            <div className={styles.specBox}>
              <BsFillPeopleFill /> {car.seats} seats
            </div>
            <div className={styles.specBox}>
              <FaDoorClosed /> {car.doors} doors
            </div>
            <div className={styles.specBox}>
              <FaSnowflake /> {car.ac ? "AC" : "No AC"}
            </div>
            <div className={styles.specBox}>
              <FaCarSide /> {car.year}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.rightSection}>
        <div className={styles.bookingCard}>
          <h3>Book This Car</h3>
          <div className={styles.formGroup}>
            <label>Pickup Location</label>
            <Input
              type="text"
              placeholder="City or Airport"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Drop-off Location</label>
            <Input
              type="text"
              placeholder="City or Airport"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Pickup Date & Time</label>
            <Input
              type="datetime-local"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Drop-off Date & Time</label>
            <Input
              type="datetime-local"
              value={dropoffDate}
              onChange={(e) => setDropoffDate(e.target.value)}
            />
          </div>
          <Button onClick={createBooking} disabled={isBooking}>
            {isBooking ? (
              <Loader color="#ffffffff" />
            ) : (
              `Confirm Booking – PKR ${car.daily_rate}/day`
            )}
          </Button>
        </div>
      </section>
    </div>
  );
}
