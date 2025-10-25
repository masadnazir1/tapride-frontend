import Image from "next/image";
import styles from "./page.module.css";
import HeroSection from "./components/sections/HeroSection/HeroSection";
import Navbar from "./components/sections/Navbar/Navbar";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Navbar />
        <HeroSection />
      </main>
    </div>
  );
}
