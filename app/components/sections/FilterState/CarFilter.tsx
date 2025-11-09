"use client";
import { useState, forwardRef } from "react";
import { useImperativeHandle } from "react";
import styles from "./CarFilter.module.css";
import Button from "../../ui/Button/Button";

interface FilterState {
  fuelType: string;
  priceMin: number;
  priceMax: number;
  location: string;
  vehicleType: string;
  bodyType: string;
  acType: string;
}

export interface CarFilterRef {
  resetFilter: () => void;
}

const CarFilter = forwardRef<
  CarFilterRef,
  { onFilterChange?: (filters: FilterState) => void }
>(({ onFilterChange }, ref) => {
  const [filters, setFilters] = useState<FilterState>({
    fuelType: "petrol",
    priceMin: 2000,
    priceMax: 10000,
    location: "rawalpindi",
    vehicleType: "car",
    bodyType: "sedan",
    acType: "yes",
  });

  const resetValues: FilterState = {
    fuelType: "petrol",
    priceMin: 2000,
    priceMax: 10000,
    location: "rawalpindi",
    vehicleType: "car",
    bodyType: "sedan",
    acType: "yes",
  };

  const resetFilter = () => {
    setFilters(resetValues);
    onFilterChange?.(resetValues);
  };

  useImperativeHandle(ref, () => ({
    resetFilter,
  }));

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
        <label>Select Location</label>
        <select
          value={filters.location}
          onChange={(e) => handleChange("location", e.target.value)}
        >
          <option value="Rawalpind">Rawalpind</option>
          <option value="Islamabad">Islamabad</option>
          <option value="Rawalpindi">Rawalpindi</option>
          {/* <option value="5">5 Seater</option>
          <option value="7">7+ Seater</option> */}
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
          <option value="yes">All</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
      <div className={styles.filterGroup}>
        <Button onClick={resetFilter}>Reset Filters</Button>
      </div>
    </aside>
  );
});

CarFilter.displayName = "CarFilter";
export default CarFilter;
