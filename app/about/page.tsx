"use client";

import PageHead from "../components/ui/PageHead/PageHead";
import styles from "./About.module.css";

export default function AboutPage() {
  return (
    <main className={styles.about}>
      {/* Page Header */}
      <PageHead
        title="About TapCars"
        subtitle="Revolutionizing car rental in Pakistan by making it fast, affordable, and accessible for everyone."
        height="45vh"
        gradientFrom="var(--primary-dark)"
        gradientTo="var(--primary)"
        overlay
        overlayColor="rgba(0,0,0,0.5)"
        textColor="#fff"
        align="left"
      />

      {/* About Content */}
      <section className={styles.contentSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <p className={styles.text}>
            At <strong>TapCars</strong>, our mission is to redefine the car
            rental experience in Pakistan. We believe transportation should be
            simple, reliable, and within reach for everyone. Our platform brings
            cutting-edge technology and transparent pricing together to make car
            rentals faster, smarter, and more customer-focused.
          </p>

          <h2 className={styles.sectionTitle}>Why Choose TapCars</h2>
          <div className={styles.featuresGrid}>
            {[
              {
                title: "Affordable Pricing",
                description:
                  "We offer transparent, competitive rates with no hidden charges. What you see is what you pay.",
              },
              {
                title: "Nationwide Coverage",
                description:
                  "From Karachi to Islamabad, TapCars operates across major cities with reliable pickup and drop-off options.",
              },
              {
                title: "Technology Driven",
                description:
                  "Book, manage, and track your rentals through our intuitive mobile and web platform — hassle-free.",
              },
              {
                title: "24/7 Support",
                description:
                  "Our dedicated support team is always available to assist you anytime, anywhere.",
              },
            ].map((item, i) => (
              <div key={i} className={styles.featureCard}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>

          <h2 className={styles.sectionTitle}>Our Vision</h2>
          <p className={styles.text}>
            We envision a future where car rentals are as easy and seamless as
            booking a ride online. With TapCars, every journey starts with
            trust, convenience, and innovation. We aim to become Pakistan’s most
            reliable and tech-powered car rental brand, empowering travelers and
            local businesses alike.
          </p>
        </div>
      </section>
    </main>
  );
}
