"use client";
import Link from "next/link";
import styles from "./not-found.module.css";
import { FaCarCrash } from "react-icons/fa";

export default function NotFound() {
  return (
    <section className={styles.section}>
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <FaCarCrash className={styles.icon} />
        <h1 className={styles.title}>404 — Page Not Found</h1>
        <p className={styles.desc}>
          Looks like you took a wrong turn. The page you’re looking for doesn’t
          exist or has been moved.
        </p>
        <Link href="/" className={styles.button}>
          Back to Home
        </Link>
      </div>
    </section>
  );
}
