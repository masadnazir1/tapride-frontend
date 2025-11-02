"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";
import styles from "./AccountNavBar.module.css";
import { useRouter } from "next/navigation";

export default function AccountNavBar() {
  const router = useRouter();
  const { user } = useUser();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning");
    } else if (hour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.textBlock}>
          <p className={styles.timeWord}>{greeting.split(" ")[1]}</p>
          <h2 className={styles.username}>{user?.fullName || "Guest"}</h2>
        </div>
      </div>

      <div
        className={styles.right}
        onClick={() => router.replace("/dashboard/account")}
      >
        <div className={styles.userAvatar}>
          {user?.fullName ? user.fullName.charAt(0).toUpperCase() : "G"}
        </div>
      </div>
    </header>
  );
}
