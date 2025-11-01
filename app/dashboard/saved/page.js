"use client";
import SavedCarsList from "../../components/AccountSections/SavedCarsList/SavedCarsList";
import { useUser } from "../../context/UserContext";
import { useRouter } from "next/navigation";
import styles from "./saved.module.css";

export default function saved() {
  const { user } = useUser();
  const router = useRouter();
  return (
    <>
      <main className={styles.container}>
        <SavedCarsList
          title="My Saved Cars"
          onCarClick={(car) => router.push(`/car-details/${car.car_id}`)}
        />
      </main>
    </>
  );
}
