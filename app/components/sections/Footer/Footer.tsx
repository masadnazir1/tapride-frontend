import React from "react";
import styles from "./Footer.module.css";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

const CarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={styles.carIcon}
  >
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.8-.7-1.5-1.5-1.5h-1.4c-.6 0-1.1-.3-1.5-.7L14 7c-.2-.5-.7-.8-1.2-.8H9.2c-.5 0-1 .3-1.2.8L6.4 11.8c-.4.4-.9.7-1.5.7H3.5C2.7 13.5 2 14.2 2 15v3c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);

interface ContactDetailProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const ContactDetail: React.FC<ContactDetailProps> = ({
  icon,
  label,
  value,
}) => (
  <div className={styles.contactDetail}>
    <div className={styles.contactIcon}>{icon}</div>
    <div className={styles.contactText}>
      <p className={styles.contactLabel}>{label}</p>
      <p className={styles.contactValue}>{value}</p>
    </div>
  </div>
);

interface LinkGroupProps {
  title: string;
  links: string[];
}

const LinkGroup: React.FC<LinkGroupProps> = ({ title, links }) => (
  <div className={styles.linkGroup}>
    <h3>{title}</h3>
    <ul>
      {links.map((link) => (
        <li key={link}>
          <a href="#">{link}</a>
        </li>
      ))}
    </ul>
  </div>
);

const Footer: React.FC = () => {
  const usefulLinks = ["About us", "Contact us", "Gallery", "Blog", "F.A.Q"];
  const vehicles = ["Sedan", "Cabriolet", "Pickup", "Minivan", "SUV"];

  return (
    <footer className={styles.wrapper}>
      <div className={styles.container}>
        {/* Top Section */}
        <div className={styles.topSection}>
          <div className={styles.logo}>
            <Image src="/logo.png" alt="TapRides" width={100} height={50} />
          </div>

          <ContactDetail
            icon={<MapPin />}
            label="Address"
            value="Oxford Ave, Cary, NC 27511"
          />
          <ContactDetail
            icon={<Mail />}
            label="Email"
            value="support@TapRide.com"
          />
          <ContactDetail
            icon={<Phone />}
            label="Phone"
            value="+1 537-547-6401"
          />
        </div>

        {/* Middle Section */}
        <div className={styles.middleSection}>
          <div>
            <p className={styles.contactValue}>
              Rent a car instantly with TapRide. Choose from our wide selection
              of vehicles and enjoy safe, reliable rides anywhere.
            </p>
            <div className={styles.socialIcons}>
              {["F", "I", "X", "Y"].map((letter, i) => (
                <div key={i} className={styles.socialIcon}>
                  {letter}
                </div>
              ))}
            </div>
          </div>

          <LinkGroup title="Useful links" links={usefulLinks} />
          <LinkGroup title="Vehicles" links={vehicles} />

          <div className={styles.downloadApp}>
            <h3>Download App</h3>
            <a href="#">
              <Image
                src="/icons/appstore.png"
                alt="Download on the App Store"
                width={162}
                height={48}
              />
            </a>
            <a href="#">
              <Image
                src="/icons/plystore.png"
                alt="Get it on Google Play"
                width={162}
                height={48}
              />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottomSection}>
          &copy; 2024 TapRide. Designed by Galaxydev.pk
        </div>
      </div>
    </footer>
  );
};

export default Footer;
