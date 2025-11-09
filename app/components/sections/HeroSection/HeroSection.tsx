"use client";

import { useEffect, useState } from "react";
import Button from "../../ui/Button/Button"; // Ensure this Button supports variant="outline" for CSS styling
import Input from "../../ui/Input/Input"; // Ensure this Input has a root 'input' element to target
import styles from "./HeroSection.module.css";
import CustomDatePicker from "../../ui/CustomDate/CustomDatePicker";
import { useRouter } from "next/navigation";
import CustomTimePicker from "../../ui/CustomTimePicker/CustomTimePicker";

export default function HeroSection() {
  const router = useRouter();
  const images = ["/images/hero1.jpg", "/images/hero2.jpg", "/images/bg.jpg"];

  const [activeIndex, setActiveIndex] = useState(0);

  const [pickupLocation, setPickupLocation] = useState("");

  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");

  const [pickupTime, setPickupTime] = useState<Date | null>(null);
  const [dropoffTime, setDropoffTime] = useState<Date | null>(null);

  const [showPickupPicker, setShowPickupPicker] = useState(false);
  const [showDropoffPicker, setShowDropoffPicker] = useState(false);

  const [showPickupTimePicker, setShowPickupTimePicker] = useState(false);
  const [showDropoffTimePicker, setShowDropoffTimePicker] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/search?pickupLocation=${pickupLocation}&pickupDate=${pickupDate}&pickupTime=${
        pickupTime ? pickupTime.toISOString() : ""
      }&dropoffDate=${dropoffDate}&dropoffTime=${
        dropoffTime ? dropoffTime.toISOString() : ""
      }`
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className={styles.hero}>
      {/* Background Carousel */}
      <div className={styles.carousel}>
        {images.map((src, index) => (
          <div
            key={index}
            className={`${styles.slide} ${
              index === activeIndex ? styles.active : ""
            }`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
        <div className={styles.overlay}></div>
      </div>

      {/* Content */}
      <div className={styles.container}>
        <div className={styles.left}>
          <h1>Book Your Perfect Ride</h1>
          <p>
            Fast, affordable, and reliable car rental across Pakistan. Get
            behind the wheel in minutes.
          </p>
          <div className={styles.buttons}>
            {/* The first button (Book Now) will be primary, the second (Learn More) will be outline */}
            <Button onClick={() => router.replace("/cars")}>Book Now</Button>
            <Button onClick={() => router.replace("/about")} variant="outline">
              Learn More
            </Button>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.searchCard}>
            <form className={styles.form} onSubmit={handleSearch}>
              <div className={styles.FieldsWrapper}>
                <div className={styles.formGroup}>
                  <Input
                    placeholder="Pick-up location"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    fullWidth // Keep fullWidth for the Input component
                  />
                </div>

                {/* Pickup row */}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <Input
                      placeholder="Pick-up date"
                      value={pickupDate}
                      onFocus={() => setShowPickupPicker(true)}
                      readOnly
                      fullWidth // Ensure this input stretches
                    />
                    {showPickupPicker && (
                      <CustomDatePicker
                        variant="modal"
                        visible={showPickupPicker}
                        selectedDate={
                          pickupDate ? new Date(pickupDate) : undefined
                        }
                        onDateChange={(date) => {
                          setPickupDate(date.toISOString().split("T")[0]); // Format date for display
                          setShowPickupPicker(false);
                        }}
                        disablePastDates
                        onClose={() => setShowPickupPicker(false)}
                      />
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <Input
                      type="text"
                      placeholder="Pick-up time"
                      value={
                        pickupTime
                          ? pickupTime.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : ""
                      }
                      fullWidth
                      onClick={() => setShowPickupTimePicker(true)}
                      readOnly
                    />
                    <CustomTimePicker
                      selectedTime={pickupTime || new Date()}
                      onTimeChange={(time) => setPickupTime(time)}
                      visible={showPickupTimePicker}
                      onClose={() => setShowPickupTimePicker(false)}
                    />
                  </div>
                </div>

                {/* Drop-off row */}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <Input
                      placeholder="Drop-off date"
                      value={dropoffDate}
                      onFocus={() => setShowDropoffPicker(true)}
                      readOnly
                      fullWidth
                    />
                    {showDropoffPicker && (
                      <CustomDatePicker
                        variant="modal"
                        visible={showDropoffPicker}
                        selectedDate={
                          dropoffDate ? new Date(dropoffDate) : undefined
                        }
                        disableBeforeDate={
                          pickupDate ? new Date(pickupDate) : undefined
                        }
                        onDateChange={(date) => {
                          setDropoffDate(date.toISOString().split("T")[0]); // Format date for display
                          setShowDropoffPicker(false);
                        }}
                        disablePastDates
                        onClose={() => setShowDropoffPicker(false)}
                      />
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <Input
                      type="text"
                      placeholder="Drop-off time"
                      value={
                        dropoffTime
                          ? dropoffTime.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : ""
                      }
                      fullWidth
                      onClick={() => setShowDropoffTimePicker(true)}
                      readOnly
                    />
                    <CustomTimePicker
                      selectedTime={dropoffTime || new Date()}
                      onTimeChange={(time) => setDropoffTime(time)}
                      visible={showDropoffTimePicker}
                      onClose={() => setShowDropoffTimePicker(false)}
                    />
                  </div>
                </div>
              </div>

              {/* The form submit button */}
              <Button type="submit">Search</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
