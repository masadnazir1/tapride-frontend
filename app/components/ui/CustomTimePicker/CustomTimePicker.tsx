"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./CustomTimePicker.module.css";

interface CustomTimePickerProps {
  selectedTime?: Date;
  onTimeChange: (time: Date) => void;
  visible?: boolean;
  onClose?: () => void;
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  selectedTime,
  onTimeChange,
  visible = true,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);
  const [ampm, setAmPm] = useState("AM");

  useEffect(() => {
    if (selectedTime) {
      const h = selectedTime.getHours();
      setHour(h % 12 || 12);
      setMinute(selectedTime.getMinutes());
      setAmPm(h >= 12 ? "PM" : "AM");
    }
  }, [selectedTime]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose?.();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleTimeChange = (type: string, value: string | number) => {
    if (!selectedTime) return;
    let newDate = new Date(selectedTime);
    let h = hour;
    let m = minute;
    if (type === "hour") h = Number(value);
    if (type === "minute") m = Number(value);
    if (type === "ampm") setAmPm(value as string);
    const finalHour = value === "PM" || ampm === "PM" ? (h % 12) + 12 : h % 12;
    newDate.setHours(finalHour, m);
    setHour(h);
    setMinute(m);
    onTimeChange(newDate);
  };

  if (!visible) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div ref={modalRef} className={styles.modalContent}>
        <h3 className={styles.title}>Select Time</h3>

        <div className={styles.timeSelector}>
          <select
            value={hour}
            onChange={(e) => handleTimeChange("hour", e.target.value)}
          >
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <span>:</span>

          <select
            value={minute}
            onChange={(e) => handleTimeChange("minute", e.target.value)}
          >
            {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((m) => (
              <option key={m} value={m}>
                {m.toString().padStart(2, "0")}
              </option>
            ))}
          </select>

          <select
            value={ampm}
            onChange={(e) => handleTimeChange("ampm", e.target.value)}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>

        <div className={styles.actions}>
          <button onClick={onClose} className={styles.closeBtn}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomTimePicker;
