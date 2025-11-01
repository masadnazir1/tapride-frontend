"use client";

import React, { useState, useEffect } from "react";
import {
  FaTachometerAlt,
  FaHeart,
  FaSignOutAlt,
  FaCar,
  FaBars,
  FaUser,
} from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./layout.module.css";
import Image from "next/image";

const navItems = [
  { name: "Dashboard", icon: FaTachometerAlt, path: "/dashboard" },
  { name: "Bookings", icon: FaCar, path: "/dashboard/bookings" },
  { name: "Saved", icon: FaHeart, path: "/dashboard/saved" },
  { name: "Account", icon: FaUser, path: "/dashboard/account" },
];
const mobileNavItems = [
  { name: "Dashboard", icon: "/icons/homeicon.png", path: "/dashboard" },
  {
    name: "Bookings",
    icon: "/icons/bookings.png",
    path: "/dashboard/bookings",
  },
  { name: "Saved", icon: "/icons/heart.png", path: "/dashboard/saved" },
  {
    name: "Account",
    icon: "/icons/user.png",
    path: "/dashboard/account",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const handleToggleCollapse = () => setCollapsed(!collapsed);

  // Collapse automatically on resize < 900px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setCollapsed(true);
      }
    };

    handleResize(); // run once at mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside
        className={`${styles.sidebar} ${
          collapsed ? styles.collapsed : styles.expanded
        }`}
      >
        <div>
          <div className={styles.sidebarHeader}>
            <span
              className={`${styles.brand} ${
                collapsed ? styles.hiddenBrand : ""
              }`}
              onClick={() => (window.location.href = "/")}
            >
              <Image
                src="/logo.png"
                width={100}
                height={50}
                alt="TapRide"
                loading="eager"
              />
            </span>
            <button onClick={handleToggleCollapse} className={styles.toggleBtn}>
              <FaBars />
            </button>
          </div>

          <nav className={styles.nav}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`${styles.navLink} ${active ? styles.active : ""}`}
                >
                  <Icon className="text-lg" />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className={styles.logout}>
          <button className={styles.logoutBtn}>
            <FaSignOutAlt className="text-lg" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>{children}</main>

      {/* Mobile Bottom Nav */}
      <nav className={styles.mobileNav}>
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={styles.mobileLink}
            >
              <Image
                src={item.icon}
                alt={item.name}
                width={30}
                height={30}
              ></Image>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
