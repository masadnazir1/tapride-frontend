"use client";
import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { pathNames } from "@/app/utils/pathName";
import { useUser } from "@/app/context/UserContext";

const Navbar: React.FC = () => {
  const pathname = usePathname();

  const { user, token } = useUser();
  if (pathNames.includes(pathname)) return false;

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
          {menuOpen ? <FaTimes color="#000" /> : <FaBars color="#000" />}
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
          <Link href="/">Home</Link>
          <Link href="/search">Search Cars</Link>
          <Link href="/cars">Cars</Link>
          <Link href="/about">About Us</Link>
          <Link href="/blogs">Our Blogs</Link>
          <Link href="/contact">Contact Us</Link>
        </nav>

        {/* Right Actions */}
        <div className={styles.actions}>
          {!token && (
            <Link href="/login" className={styles.loginBtn}>
              Login
            </Link>
          )}

          {!token && (
            <Link href="/signup" className={styles.signupBtn}>
              Sign Up
            </Link>
          )}

          {token && (
            <div
              className={styles.logedInUserBox}
              onClick={() => (window.location.href = "/dashboard")}
            >
              <strong className={styles.fullName}>{user?.fullName}</strong>

              <div className={styles.userpicture}>
                {user?.fullName.charAt(0)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className={styles.mobileMenueToggleWrapper}>
          <button
            className={styles.mobileMenueToggle}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            X
          </button>
        </div>
        <nav className={styles.mobileNav}>
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/search" onClick={() => setMenuOpen(false)}>
            Search Cars
          </Link>
          <Link href="/cars" onClick={() => setMenuOpen(false)}>
            Cars
          </Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>
            About Us
          </Link>
          <Link href="/blogs" onClick={() => setMenuOpen(false)}>
            Our Blogs
          </Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>
            Contact Us
          </Link>

          <div className={styles.mobileActions}>
            {!token && (
              <>
                <Link
                  href="/login"
                  className={styles.loginBtn}
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>

                <Link href="/signup" onClick={() => setMenuOpen(false)}>
                  Sign Up
                </Link>
              </>
            )}

            {token && (
              <div
                className={styles.mobileLogedInUserBox}
                onClick={() => (window.location.href = "/dashboard")}
              >
                <div className={styles.userpicture}>
                  {user?.fullName.charAt(0)}
                </div>

                <strong className={styles.mobilefullName}>
                  {user?.fullName}
                </strong>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
