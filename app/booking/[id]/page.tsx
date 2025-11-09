"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Button from "../../components/ui/Button/Button";
import Loader from "@/app/components/ui/Loader/Loader";
import Modal from "@/app/components/ui/Modal/Modal";
import Input from "@/app/components/ui/Input/Input";
import CustomDatePicker from "@/app/components/ui/CustomDate/CustomDatePicker";
import api from "../../utils/api";
import {
  FaGasPump,
  FaSnowflake,
  FaCogs,
  FaCarSide,
  FaDoorClosed,
  FaCheckCircle,
} from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import styles from "./BookingPage.module.css";
import { useUser } from "@/app/context/UserContext";
import axios from "axios";
import AuthGuard from "@/app/utils/AuthGuard";
import CarDetailsSkeleton from "@/app/components/Skeleton/CarDetailsSkeleton/CarDetailsSkeleton";
import FeaturedCars, {
  Car,
} from "../../components/sections/FeaturedCars/FeaturedCars";

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
  const [open, setOpen] = useState(false);
  const [showPickupPicker, setShowPickupPicker] = useState(false);
  const [showDropoffPicker, setShowDropoffPicker] = useState(false);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [relatedCars, setRelatedCars] = useState<Car[]>([]);
  const [relatedLoading, setRelatedLoading] = useState<boolean>(false);

  //
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus(); // focus on mount
  }, []);

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
      toast.error(
        "Kindly fill in all the required booking details to proceed."
      );

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
      const response: any = await api.post("/bookings/create", {
        startDate: pickupDate,
        endDate: dropoffDate,
        pickupLocation: pickup,
        dropoffLocation: dropoff,
        carId: car?.id,
        renterId: user?.id,
        dealerId: car?.dealer_id,
      });

      if (response?.success) {
        toast.success(response?.message);
        setOpen(!open);
        setisBooking(false);
      } else {
        toast.error("Something went wrong. Please try again.");
        setisBooking(false);
      }
    } catch (err: any) {
      setisBooking(false);
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          toast.error("You already have a pending or confirmed booking.");
          router.replace("/dashboard/bookings");
        } else if (err.response) {
          toast.error(`Booking failed: ${err.response.statusText}`);
        } else {
          toast.error("Network error. Please try again.");
        }
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setisBooking(false);
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
      setRelatedLoading(false);
      console.error("Failed to fetch related cars:", err);
    } finally {
      setRelatedLoading(false);
    }
  }

  useEffect(() => {
    getRelatedCars(1);
  }, [id]);

  if (!car)
    return (
      <div style={{ margin: "5rem 2rem" }}>
        <CarDetailsSkeleton />
      </div>
    );

  return (
    <>
      <AuthGuard>
        <div className={styles.Container}>
          <section className={styles.maindetailsSection}>
            <section className={styles.leftSection}>
              <img
                src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}${sliderMain}`}
                alt={car.name}
                width={1000}
                height={400}
                className={styles.mainImage}
              />
              <div className={styles.thumbnailLine}>
                {imageSlider.map((img, idx) => (
                  <img
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
                    ref={inputRef}
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
                  <label>Pickup Date</label>
                  <Input
                    type="text"
                    placeholder="Select date"
                    value={
                      pickupDate
                        ? new Date(pickupDate).toLocaleDateString()
                        : ""
                    }
                    onFocus={() => setShowPickupPicker(true)}
                    readOnly
                  />
                  <CustomDatePicker
                    variant="modal"
                    visible={showPickupPicker}
                    selectedDate={pickupDate ? new Date(pickupDate) : undefined}
                    onDateChange={(date) => {
                      setPickupDate(date.toISOString());
                      setShowPickupPicker(false);
                    }}
                    disablePastDates
                    onClose={() => setShowPickupPicker(false)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Drop-off Date</label>
                  <Input
                    type="text"
                    placeholder="Select date"
                    value={
                      dropoffDate
                        ? new Date(dropoffDate).toLocaleDateString()
                        : ""
                    }
                    onFocus={() => setShowDropoffPicker(true)}
                    readOnly
                  />
                  <CustomDatePicker
                    variant="modal"
                    visible={showDropoffPicker}
                    selectedDate={
                      dropoffDate ? new Date(dropoffDate) : undefined
                    }
                    onDateChange={(date) => {
                      setDropoffDate(date.toISOString());
                      setShowDropoffPicker(false);
                    }}
                    disablePastDates
                    disableBeforeDate={
                      pickupDate ? new Date(pickupDate) : undefined
                    }
                    onClose={() => setShowDropoffPicker(false)}
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

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Order Placed Successfully"
        >
          <div className={styles.wrapper}>
            <div className={styles.iconWrap}>
              <FaCheckCircle className={styles.icon} />
            </div>

            <h2 className={styles.title}>Order Placed Successfully</h2>
            <p className={styles.message}>
              Your rent-a-car order has been placed successfully. You can check
              your booking status anytime.
            </p>

            <div className={styles.actions}>
              <Button onClick={() => router.replace("/dashboard/bookings")}>
                View Status
              </Button>
              <Button variant="outline" onClick={() => setOpen(!open)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      </AuthGuard>
    </>
  );
}
