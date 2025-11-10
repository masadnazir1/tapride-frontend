"use client";

import { useState, useEffect } from "react";
import styles from "./BookingDetail.module.css";
import api from "@/app/utils/api";
import { BookingDetailProps } from "@/app/Interfaces/BookingDetailPropsI";
import {
  FaGasPump,
  FaSnowflake,
  FaCogs,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import Button from "@/app/components/ui/Button/Button";
import { useSearchParams } from "next/navigation";

export default function BookingDetail() {
  const [booking, setbooking] = useState<BookingDetailProps>();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id");

  console.log(bookingId);
  async function bookingDetails() {
    const res: any = await api.get(
      `/bookings/user/booking-details/${bookingId}`
    );
    setbooking(res?.data);
  }

  useEffect(() => {
    bookingDetails();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Booking Details</h1>
      {booking && (
        <div className={styles.innerconatiner}>
          {/* LEFT: Summary & Info */}
          <div className={styles.left}>
            {/* Booking Summary */}
            <section className={styles.section}>
              <div className={styles.row}>
                <div>
                  <p className={styles.label}>Booking ID</p>
                  <p className={styles.value}>#{booking?.bookingId}</p>
                </div>
                <div>
                  <p className={styles.label}>Booking Date</p>
                  <p className={styles.value}>
                    {new Date(booking.bookingDate).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className={styles.row}>
                <div>
                  <p className={styles.label}>Status</p>
                  <p className={`${styles.badge} ${styles.confirmed}`}>
                    {booking.status}
                  </p>
                </div>
                <div>
                  <p className={styles.label}>Payment</p>
                  <p className={`${styles.badge} ${styles.paid}`}>
                    {booking.paymentStatus}
                  </p>
                </div>
              </div>

              <div className={styles.total}>
                <p className={styles.label}>Total Amount</p>
                <p className={styles.amount}>
                  PKR {Number(booking.totalAmount).toFixed(0)}
                </p>
              </div>
            </section>

            {/* Rental Period */}
            <section className={styles.section}>
              <h2>Rental Period & Location</h2>
              <div className={styles.period}>
                <p>
                  <FaCalendarAlt /> Pickup:{" "}
                  {new Date(booking.rentalPeriod.pickupDate).toLocaleString()}
                </p>
                <p>
                  <FaMapMarkerAlt /> {booking.rentalPeriod.pickupLocation}
                </p>
                <p>
                  <FaCalendarAlt /> Return:{" "}
                  {new Date(booking.rentalPeriod.returnDate).toDateString()}
                </p>
                <p>
                  <FaMapMarkerAlt /> {booking.rentalPeriod.returnLocation}
                </p>
              </div>
              <p className={styles.duration}>
                {/* Total Duration: {booking.rentalPeriod.duration} */}
              </p>
            </section>

            {/* Dealer Details */}
            <section className={styles.section}>
              <h2>Dealer Details</h2>
              <p className={styles.dealerName}>{booking.dealer.name}</p>
              <p>{booking.dealer.address}</p>
              <p>{booking.dealer.phone}</p>
              <p>{booking.dealer.email}</p>
            </section>

            {/* Notes */}
            <section className={styles.section}>
              <h2>Notes & Updates</h2>
              <p className={styles.note}>
                <strong>Dealer Message:</strong> Your car is confirmed and ready
                for pickup. Please proceed to counter #5 in the rental hall.
              </p>
              <p className={styles.note}>
                <strong>Special Instructions:</strong> Requesting a child seat
                for a 4-year-old.
              </p>
            </section>
          </div>

          {/* RIGHT: Car + Actions */}
          <div className={styles.right}>
            {/* Car Card */}
            <section className={styles.carCard}>
              <img
                src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}${booking.car.images[0]}`}
                // src={booking.car.image}
                alt={booking.car.name}
                className={styles.carImage}
              />
              <div className={styles.carDetails}>
                <h3>{booking.car.name}</h3>
                <p>
                  Model: {booking.car.make}, Year: {booking.car.year}
                </p>
                <p className={styles.rate}>
                  ${Number(booking.car.dailyRate).toFixed(0)}/day
                </p>
                <div className={styles.icons}>
                  <span>
                    <FaGasPump /> {booking.car.fuel}
                  </span>
                  <span>
                    <FaCogs /> {booking.car.transmission}
                  </span>
                  <span>
                    <FaSnowflake /> A/C
                  </span>
                  <span>
                    <BsFillPeopleFill /> {booking.car.seats} Seats
                  </span>
                </div>
              </div>
            </section>

            {/* Payment Section */}
            <section className={styles.section}>
              <h2>Payment & Invoice</h2>
              <p>
                <strong>Payment Method:</strong> Visa **** 4242
              </p>
              <p>
                <strong>Amount Paid:</strong> PKR{" "}
                {Number(booking.totalAmount).toFixed(0)}
              </p>
              <Button>Download Invoice</Button>
            </section>

            {/* Actions */}
            <section className={styles.actions}>
              <Button>Modify Booking</Button>
              <Button variant="outline">Cancel Booking</Button>
              <Button variant="ghost">Contact Dealer</Button>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
