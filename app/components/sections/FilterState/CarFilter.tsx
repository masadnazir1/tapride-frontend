"use client";
import { useState } from "react";
import styles from "./CarFilter.module.css";

interface FilterState {
  fuelType: string;
  priceMin: number;
  priceMax: number;
  seats: string;
  vehicleType: string;
  bodyType: string;
  acType: string;
}

export default function CarFilter({
  onFilterChange,
}: {
  onFilterChange?: (filters: FilterState) => void;
}) {
  const [filters, setFilters] = useState<FilterState>({
    fuelType: "",
    priceMin: 0,
    priceMax: 50000,
    seats: "",
    vehicleType: "",
    bodyType: "",
    acType: "",
  });

  const handleChange = (key: keyof FilterState, value: string | number) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilterChange?.(updated);
  };

  return (
    <aside className={styles.filterContainer}>
      <h3 className={styles.title}>Filter Cars</h3>

      <div className={styles.filterGroup}>
        <label>Fuel Type</label>
        <select
          value={filters.fuelType}
          onChange={(e) => handleChange("fuelType", e.target.value)}
        >
          <option value="">All</option>
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
          <option value="hybrid">Hybrid</option>
          <option value="electric">Electric</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label>Price Range (PKR)</label>
        <div className={styles.priceRow}>
          <input
            type="number"
            value={filters.priceMin}
            min={0}
            onChange={(e) => handleChange("priceMin", Number(e.target.value))}
            className={styles.priceInput}
          />
          <span>-</span>
          <input
            type="number"
            value={filters.priceMax}
            min={filters.priceMin}
            onChange={(e) => handleChange("priceMax", Number(e.target.value))}
            className={styles.priceInput}
          />
        </div>
        <input
          type="range"
          min="0"
          max="100000"
          step="1000"
          value={filters.priceMax}
          onChange={(e) => handleChange("priceMax", Number(e.target.value))}
          className={styles.slider}
        />
      </div>

      <div className={styles.filterGroup}>
        <label>Seats</label>
        <select
          value={filters.seats}
          onChange={(e) => handleChange("seats", e.target.value)}
        >
          <option value="">All</option>
          <option value="2">2 Seater</option>
          <option value="4">4 Seater</option>
          <option value="5">5 Seater</option>
          <option value="7">7+ Seater</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label>Vehicle Type</label>
        <select
          value={filters.vehicleType}
          onChange={(e) => handleChange("vehicleType", e.target.value)}
        >
          <option value="">All</option>
          <option value="car">Car</option>
          <option value="van">Van</option>
          <option value="truck">Truck</option>
          <option value="bike">Bike</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label>Body Type</label>
        <select
          value={filters.bodyType}
          onChange={(e) => handleChange("bodyType", e.target.value)}
        >
          <option value="">All</option>
          <option value="sedan">Sedan</option>
          <option value="hatchback">Hatchback</option>
          <option value="suv">SUV</option>
          <option value="convertible">Convertible</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label>AC Type</label>
        <select
          value={filters.acType}
          onChange={(e) => handleChange("acType", e.target.value)}
        >
          <option value="">All</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
    </aside>
  );
}
