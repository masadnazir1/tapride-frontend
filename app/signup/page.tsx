"use client";

import React, { useState } from "react";
import styles from "./Signup.module.css";
import Button from "../components/ui/Button/Button";
import Input from "../components/ui/Input/Input";
import { FaUserPlus } from "react-icons/fa";
import Image from "next/image";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <Image src="/logo.jpg" alt="TapRides" width={200} height={100} />
        </div>

        <div className={styles.header}>
          <h2>Join us today!</h2>
          <p>Create an account to get started.</p>
        </div>

        <form className={styles.form}>
          <Input
            label="Full Name"
            name="name"
            placeholder="Muhammad Asad Nazir"
            value={form.name}
            onChange={handleChange}
            fullWidth
          />

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="masadnazir1@gmail.com"
            value={form.email}
            onChange={handleChange}
            fullWidth
          />

          <Input
            label="Phone Number"
            name="phone"
            inputMode="tel"
            placeholder="+923208648637"
            value={form.phone}
            onChange={handleChange}
            fullWidth
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••••••"
            value={form.password}
            onChange={handleChange}
            fullWidth
          />

          <Button tone="success" icon={FaUserPlus} iconPosition="left">
            Sign Up
          </Button>
        </form>

        <div className={styles.footer}>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}
