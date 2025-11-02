"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaArrowsRotate } from "react-icons/fa6";
import ConfirmationModal from "@/app/components/ui/ConfirmationModal/ConfirmationModal";
import { useRouter } from "next/navigation";
import styles from "./bookings.module.css";
import api from "@/app/utils/api";
import Button from "@/app/components/ui/Button/Button";
import { useUser } from "@/app/context/UserContext";
import BookingsSkeleton from "@/app/components/Skeleton/BookingsSkeleton/BookingsSkeleton";
import axios from "axios";

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
  const router = useRouter();
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [pastBookings, setPastBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [cancelId, setcancelId] = useState(Number);

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

  async function cancelBooking(bookingId: number) {
    if (!bookingId) {
      return;
    }
    try {
      const response: any = await api.put(`/bookings/${bookingId}/cancel`);
      toast.success(response.message);

      if (response) {
        setOpen(!open);
        fetchBookings();
      }
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (err.status === 400) {
          toast.error(err?.response?.data.message);
        } else
          toast.error("Something went wrong , pleas try again"),
            console.error("error", err);
        setOpen(!open);
        fetchBookings();
      }
    }
  }

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const renderBookings = (data: Booking[], isUpcoming: boolean) => {
    if (!data.length) {
      return (
        <div className={styles.emptyState}>
          <p>No {isUpcoming ? "upcoming" : "past"} bookings yet.</p>
          <Button onClick={() => router.replace("/cars")}>Book a Ride</Button>
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

                  <img
                    src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}${b.car.images[0]}`}
                    alt={b.car.name}
                    width={1000}
                    height={200}
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      marginTop: "1.5rem",
                      height: "auto",
                      maxHeight: "250",
                    }}
                  />
                </div>
              )}
              <div className={styles.actions}>
                {isUpcoming ? (
                  <>
                    <Button variant="outline">View Details</Button>
                    {b.status.toLowerCase() !== "cancelled" && (
                      <Button
                        onClick={() => {
                          setcancelId(b?.id);
                          setOpen(!open);
                        }}
                        tone="danger"
                      >
                        Cancel Ride
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <span className={styles.fare}>PKR {b.total_price}</span>
                    <Button
                      style={{
                        width: "auto",
                        fontWeight: "bold",
                      }}
                    >
                      <FaArrowsRotate className={styles.rebookIcon} />
                      Rebook
                    </Button>
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
          <BookingsSkeleton count={3} />
        ) : activeTab === "upcoming" ? (
          renderBookings(upcomingBookings, true)
        ) : (
          renderBookings(pastBookings, false)
        )}
      </div>

      <ConfirmationModal
        isOpen={open}
        title="Confirmation"
        message="Are you sure you want to cancel the Booking?"
        confirmText="cancel Booking"
        cancelText="Keep it"
        onConfirm={() => cancelBooking(cancelId)}
        onCancel={() => setOpen(false)}
        loading={loading}
      />
    </div>
  );
}
