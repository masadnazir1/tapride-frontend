"use client";

import React, { useState } from "react";
import styles from "./bookings.module.css";

type Booking = {
  id: number;
  date: string;
  time: string;
  pickup: string;
  dropoff: string;
  driver: string;
  vehicle: string;
  status: "Confirmed" | "Pending" | "Cancelled" | "Completed";
  fare?: string;
};

const upcomingBookings: Booking[] = [
  {
    id: 1,
    date: "Nov 10, 2025",
    time: "10:00 AM",
    pickup: "Downtown Station",
    dropoff: "Airport Terminal 3",
    driver: "John Doe",
    vehicle: "Toyota Prius - ABC 123",
    status: "Confirmed",
  },
  {
    id: 2,
    date: "Nov 15, 2025",
    time: "3:30 PM",
    pickup: "Central Mall",
    dropoff: "University Campus",
    driver: "Alex Smith",
    vehicle: "Honda Civic - XYZ 789",
    status: "Pending",
  },
];

const pastBookings: Booking[] = [
  {
    id: 3,
    date: "Oct 25, 2025",
    time: "6:00 PM",
    pickup: "North Avenue",
    dropoff: "City Park",
    driver: "Sam Wilson",
    vehicle: "Hyundai Sonata - LMN 456",
    status: "Completed",
    fare: "$25.00",
  },
];

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

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
        {data.map((b) => (
          <div key={b.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>{b.date}</h3>
              <span
                className={`${styles.status} ${styles[b.status.toLowerCase()]}`}
              >
                {b.status}
              </span>
            </div>
            <p className={styles.time}>{b.time}</p>
            <div className={styles.route}>
              <span className={styles.label}>Pickup:</span>
              <span>{b.pickup}</span>
            </div>
            <div className={styles.route}>
              <span className={styles.label}>Drop-off:</span>
              <span>{b.dropoff}</span>
            </div>
            <div className={styles.driver}>
              <p>{b.driver}</p>
              <small>{b.vehicle}</small>
            </div>

            {isUpcoming ? (
              <div className={styles.actions}>
                <button className={styles.secondaryBtn}>View Details</button>
                {b.status !== "Cancelled" && (
                  <button className={styles.dangerBtn}>Cancel Ride</button>
                )}
              </div>
            ) : (
              <div className={styles.actions}>
                <span className={styles.fare}>{b.fare}</span>
                <button className={styles.secondaryBtn}>Rebook</button>
              </div>
            )}
          </div>
        ))}
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
        {activeTab === "upcoming"
          ? renderBookings(upcomingBookings, true)
          : renderBookings(pastBookings, false)}
      </div>
    </div>
  );
}
