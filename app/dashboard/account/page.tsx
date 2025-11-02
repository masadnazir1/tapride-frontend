"use client";

import { useState } from "react";
import { useUser } from "@/app/context/UserContext";
import Image from "next/image";
import {
  FaCamera,
  FaHistory,
  FaFileInvoice,
  FaCommentDots,
  FaSignOutAlt,
} from "react-icons/fa";
import styles from "./AccountPage.module.css";
import ConfirmationModal from "@/app/components/ui/ConfirmationModal/ConfirmationModal";

export default function AccountPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useUser();

  const initials: string = user?.fullName
    ? user.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  const menuItems: any[] = [
    { label: "Feedback", icon: <FaCommentDots /> },
    { label: "History", icon: <FaHistory /> },
    { label: "Invoices", icon: <FaFileInvoice /> },
  ];

  function handleLogout(): void {
    localStorage.clear();
    window.location.href = "/login";
  }

  return (
    <div className={styles.container}>
      {/* Cover Section */}
      <div className={styles.cover}>
        <div className={styles.coverPlaceholder}>{user?.fullName}</div>

        {/* <button className={styles.coverUpload}>
          <FaCamera />
        </button> */}
      </div>

      {/* Profile Section */}
      <div className={styles.profileSection}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatar}>
            <span className={styles.avatarInitials}>{initials}</span>
          </div>
          {/* <button className={styles.avatarUpload}>
            <FaCamera />
          </button> */}
        </div>
        <div className={styles.UserDetailsWrapper}>
          <h2 className={styles.name}>{user?.fullName}</h2>
          <p className={styles.email}>{user?.email}</p>
          <p className={styles.phone}>{user?.phone}</p>
          <p className={styles.role}>Role: {user?.role}</p>
          <p className={styles.status}>Status: {user?.status}</p>
        </div>
      </div>

      {/* Menu Items */}
      <div className={styles.menu}>
        {menuItems.map((item: any) => (
          <button key={item.label} className={styles.menuItem}>
            <span className={styles.icon}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Logout */}
      <button className={styles.logout} onClick={() => setOpen(true)}>
        <FaSignOutAlt /> Logout
      </button>

      <ConfirmationModal
        isOpen={open}
        title="Logout Confirmation"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={handleLogout}
        onCancel={() => setOpen(false)}
        loading={loading}
      />
    </div>
  );
}
