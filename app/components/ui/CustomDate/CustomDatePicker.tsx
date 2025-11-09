"use client";

import { useState, useEffect, useRef } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  isBefore,
} from "date-fns";
import styles from "./CustomDatePicker.module.css";

interface CustomDatePickerProps {
  selectedDate?: Date;
  onDateChange: (date: Date) => void;
  disablePastDates?: boolean;
  disableBeforeDate?: Date; // new prop
  minDate?: Date;
  maxDate?: Date;
  variant?: "default" | "compact" | "full" | "modal";
  visible?: boolean; // for modal toggle
  onClose?: () => void; // for modal
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  selectedDate,
  onDateChange,
  disablePastDates = true,
  disableBeforeDate,
  minDate,
  maxDate,
  variant = "default",
  visible = true,
  onClose,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selected, setSelected] = useState<Date | null>(selectedDate || null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedDate) setSelected(selectedDate);
  }, [selectedDate]);

  // Close modal on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        variant === "modal" &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        onClose?.();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [variant, onClose]);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const handleDateClick = (day: Date) => {
    const today = new Date();
    if (
      (disablePastDates && isBefore(day, today)) ||
      (disableBeforeDate && isBefore(day, disableBeforeDate)) ||
      (minDate && isBefore(day, minDate)) ||
      (maxDate && !isBefore(day, maxDate) && !isSameDay(day, maxDate))
    )
      return;
    setSelected(day);
    onDateChange(day);
    if (variant === "modal") onClose?.();
  };

  const renderHeader = () => (
    <div className={styles.header}>
      <button onClick={prevMonth}>&lt;</button>
      <span>{format(currentMonth, "MMMM yyyy")}</span>
      <button onClick={nextMonth}>&gt;</button>
    </div>
  );

  const renderDays = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className={styles.daysRow}>
        {days.map((d) => (
          <div key={d} className={styles.dayName}>
            {d}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows: any = [];
    let days: any = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const disabled =
          (disablePastDates && isBefore(cloneDay, new Date())) ||
          (disableBeforeDate && isBefore(cloneDay, disableBeforeDate)) ||
          (minDate && isBefore(cloneDay, minDate)) ||
          (maxDate &&
            !isBefore(cloneDay, maxDate) &&
            !isSameDay(cloneDay, maxDate));

        days.push(
          <div
            className={`${styles.cell} ${
              !isSameMonth(cloneDay, monthStart) ? styles.disabled : ""
            } ${
              isSameDay(cloneDay, selected || new Date()) ? styles.selected : ""
            } ${disabled ? styles.disabled : ""}`}
            key={cloneDay.toString()}
            onClick={() => handleDateClick(cloneDay)}
          >
            {format(cloneDay, "d")}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className={styles.row} key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className={styles.cells}>{rows}</div>;
  };

  if (variant === "modal" && !visible) return null;

  return (
    <div className={`${variant === "modal" ? styles.modalBackdrop : ""}`}>
      <div
        ref={modalRef}
        className={`${styles.datePicker} ${styles[variant]} ${
          variant === "modal" ? styles.modalContent : ""
        }`}
      >
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
    </div>
  );
};

export default CustomDatePicker;
