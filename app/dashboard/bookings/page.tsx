"use client";

import { useState, useEffect } from "react";
import styles from "./bookings.module.css";
import api from "@/app/utils/api";
import Image from "next/image";
import { useUser } from "@/app/context/UserContext";

type Booking = {
  id: number;
  start_date: string;
  end_date: string;
  pickup_location: string;
  dropoff_location: string;
  status: string;
  total_price?: string;
  car?: {
    name: string;
    images: string[];
  };
};

export default function BookingsPage() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [pastBookings, setPastBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const upcomingRes: any = await api.get(
        `/bookings/user/upcoming?userId=${user.id}`
      );
      setUpcomingBookings(upcomingRes?.data || []);

      const pastRes: any = await api.get(
        `/bookings/user/past?userId=${user.id}`
      );
      setPastBookings(pastRes?.bookings || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const renderBookings = (data: Booking[], isUpcoming: boolean) => {
    if (!data.length) {
      return (
        <div className={styles.emptyState}>
          <p>No {isUpcoming ? "upcoming" : "past"} bookings yet.</p>
          <button className={styles.primaryBtn}>Book a Ride</button>
        </div>
      );
    }

    return (
      <div className={styles.cards}>
        {data.map((b) => {
          const startDate = new Date(b.start_date).toLocaleDateString(
            undefined,
            { month: "short", day: "numeric", year: "numeric" }
          );
          const startTime = new Date(b.start_date).toLocaleTimeString(
            undefined,
            { hour: "2-digit", minute: "2-digit" }
          );
          const endDate = new Date(b.end_date).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          });

          return (
            <div key={b.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>
                  {startDate} - {endDate}
                </h3>
                <span
                  className={`${styles.status} ${
                    styles[b.status.toLowerCase()]
                  }`}
                >
                  {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                </span>
              </div>
              <p className={styles.time}>{startTime}</p>
              <div className={styles.route}>
                <span className={styles.label}>Pickup:</span>
                <span>{b.pickup_location}</span>
              </div>
              <div className={styles.route}>
                <span className={styles.label}>Drop-off:</span>
                <span>{b.dropoff_location}</span>
              </div>
              {b.car && (
                <div className={styles.driver}>
                  <p>{b.car.name}</p>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}${b.car.images[0]}`}
                    alt={b.car.name}
                    width={1000}
                    height={200}
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      marginTop: "0.25rem",
                    }}
                  />
                </div>
              )}
              <div className={styles.actions}>
                {isUpcoming ? (
                  <>
                    <button className={styles.secondaryBtn}>
                      View Details
                    </button>
                    {b.status.toLowerCase() !== "cancelled" && (
                      <button className={styles.dangerBtn}>Cancel Ride</button>
                    )}
                  </>
                ) : (
                  <>
                    <span className={styles.fare}>PKR {b.total_price}</span>
                    <button className={styles.secondaryBtn}>Rebook</button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>My Bookings</h1>
        <p>Track your rides and booking history easily.</p>
      </header>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            activeTab === "upcoming" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "past" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("past")}
        >
          History
        </button>
      </div>

      <div className={styles.content}>
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading...</p>
        ) : activeTab === "upcoming" ? (
          renderBookings(upcomingBookings, true)
        ) : (
          renderBookings(pastBookings, false)
        )}
      </div>
    </div>
  );
}
