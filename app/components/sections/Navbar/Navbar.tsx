"use client";
import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [menuOpen]);

  return (
    <header
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
      role="banner"
    >
      <div className={styles.inner}>
        {/* Mobile Menu Button */}
        <button
          className={styles.menuBtn}
          aria-label={menuOpen ? "Close Menu" : "Open Menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes color="#fff" /> : <FaBars color="#fff" />}
        </button>

        {/* Logo */}
        <div className={styles.logo}>
          <Link href="/" aria-label="DriveEasy Home">
            <Image src="/logo.png" alt="TapRides" width={100} height={50} />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav
          className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}
          aria-label="Main Navigation"
        >
          <Link href="/about">About</Link>
          <Link href="/fleet">Fleet</Link>
          <Link href="/services">Services</Link>
          <Link href="/locations">Locations</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* Right Actions */}
        <div className={styles.actions}>
          <Link href="/login" className={styles.loginBtn}>
            Login
          </Link>
          <Link href="/signup" className={styles.signupBtn}>
            Sign Up
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav className={styles.mobileNav}>
          <Link href="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link href="/fleet" onClick={() => setMenuOpen(false)}>
            Fleet
          </Link>
          <Link href="/services" onClick={() => setMenuOpen(false)}>
            Services
          </Link>
          <Link href="/locations" onClick={() => setMenuOpen(false)}>
            Locations
          </Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          <div className={styles.mobileActions}>
            <Link href="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
            <Link href="/signup" onClick={() => setMenuOpen(false)}>
              Sign Up
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
