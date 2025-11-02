"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/ui/Loader/Loader";
import Head from "next/head";
import styles from "./Signup.module.css";
import Button from "../components/ui/Button/Button";
import Input from "../components/ui/Input/Input";
import { FaUserPlus } from "react-icons/fa";
import Image from "next/image";
import api from "../utils/api";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!form.name || !form.email || !form.phone || !form.password) {
        toast.error("");
        return;
      }
      setIsLoading(true);
      const data: any = await api.post("/auth/user/register", {
        fullName: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: "renter",
      });

      if (data?.success) {
        toast.success(`Signup successfull for the user ${form.name}`);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400) {
          toast.error(err.response?.data.message);
        } else {
          toast.error("Something went wrong, try again");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up | TapRide.pk</title>
        <meta
          name="description"
          content="Create a TapRide.pk account to book and manage car rentals across Pakistan easily and securely."
        />
        <meta
          name="keywords"
          content="TapRide, car rental, signup, register, Pakistan"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://tapride.pk/signup" />
        <meta property="og:title" content="Sign Up | TapRide.pk" />
        <meta
          property="og:description"
          content="Create a TapRide.pk account to book and manage car rentals across Pakistan easily and securely."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tapride.pk/signup" />
        <meta property="og:image" content="https://tapride.pk/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sign Up | TapRide.pk" />
        <meta
          name="twitter:description"
          content="Create a TapRide.pk account to book and manage car rentals across Pakistan easily and securely."
        />
        <meta name="twitter:image" content="https://tapride.pk/og-image.jpg" />
      </Head>

      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.logo}>
            <Image src="/logo.jpg" alt="TapRides" width={200} height={100} />
          </div>

          <div className={styles.header}>
            <h2>Join us today!</h2>
            <p>Create an account to get started.</p>
          </div>

          <form className={styles.form} onSubmit={handleSignup}>
            <Input
              label="Full Name"
              name="name"
              placeholder="Muhammad Asad Nazir"
              value={form.name}
              onChange={handleChange}
              fullWidth
              required
            />

            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="masadnazir1@gmail.com"
              value={form.email}
              onChange={handleChange}
              fullWidth
              required
            />

            <Input
              label="Phone Number"
              name="phone"
              inputMode="tel"
              placeholder="+923208648637"
              value={form.phone}
              onChange={handleChange}
              fullWidth
              required
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••••••"
              value={form.password}
              onChange={handleChange}
              fullWidth
              required
            />

            {isLoading ? (
              <Button variant="outline" disabled={isLoading}>
                <Loader color="#fff" />
              </Button>
            ) : (
              <Button
                type="submit"
                tone="success"
                icon={FaUserPlus}
                iconPosition="left"
                disabled={isLoading}
              >
                Sign Up
              </Button>
            )}
          </form>

          <div className={styles.footer}>
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
