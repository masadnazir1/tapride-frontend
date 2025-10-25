"use client";
import styles from "./../page.module.css";

import HeroSection from "../components/sections/HeroSection/HeroSection";
import Footer from "../components/sections/Footer/Footer";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HeroSection />
        <Footer
          logo="DriveEasy"
          links={[
            { label: "About Us", href: "/about" },
            { label: "Fleet", href: "/fleet" },
            { label: "Services", href: "/services" },
            { label: "Contact", href: "/contact" },
            { label: "Blog", href: "/blog" },
          ]}
          socials={[
            {
              type: "facebook",
              show: true,
              href: "https://facebook.com/driveeasy",
            },
            {
              type: "twitter",
              show: true,
              href: "https://twitter.com/driveeasy",
            },
            {
              type: "linkedin",
              show: true,
              href: "https://linkedin.com/company/driveeasy",
            },
            {
              type: "instagram",
              show: true,
              href: "https://instagram.com/driveeasy",
            },
          ]}
          buttons={[
            { label: "Book Now", type: "filled", href: "/booking" },
            { label: "Subscribe", type: "outline", href: "/subscribe" },
          ]}
          showCopyright
        />
      </main>
    </div>
  );
}
