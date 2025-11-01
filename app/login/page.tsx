"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import styles from "./Login.module.css";
import Button from "../components/ui/Button/Button";
import Input from "../components/ui/Input/Input";
import Loader from "../components/ui/Loader/Loader";
import { FaSignInAlt, FaGoogle } from "react-icons/fa";
import { useUser } from "../context/UserContext";

import Head from "next/head";
import api from "../utils/api";
import axios from "axios";

export default function LoginPage() {
  const { setUserData } = useUser();
  const [email, setEmail] = useState("masadnazir1@gmail.com");
  const [password, setPassword] = useState("masadnazir1@");
  const [remember, setRemember] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent page reload

    try {
      setisLoading(true);
      const data: any = await api.post("/auth/user/login", { email, password });

      setUserData(data.user, data?.token);

      if (data.success) {
        toast.success(`Login successfull for ${data.user?.fullName}`);
        window.location.href = "/dashboard/bookings";
      }

      setisLoading(false);
    } catch (err: any) {
      setisLoading(false);

      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data.message);
      } else {
        toast.error(
          "Something went wrong please check credentials and try again"
        );
      }
    } finally {
      setisLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login | TapRide.pk</title>
        <meta
          name="description"
          content="Login to your TapRide.pk account to book and manage car rentals across Pakistan. Fast, easy, and secure."
        />
        <meta
          name="keywords"
          content="TapRide, car rental, login, book car, Pakistan"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://tapride.pk/login" />
        <meta property="og:title" content="Login | TapRide.pk" />
        <meta
          property="og:description"
          content="Login to your TapRide.pk account to book and manage car rentals across Pakistan."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tapride.pk/login" />
        <meta property="og:image" content="https://tapride.pk/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Login | TapRide.pk" />
        <meta
          name="twitter:description"
          content="Login to your TapRide.pk account to book and manage car rentals across Pakistan."
        />
        <meta name="twitter:image" content="https://tapride.pk/og-image.jpg" />
      </Head>

      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.logo}>
            <Image src="/logo.png" alt="TapRides" width={200} height={100} />
          </div>

          <div className={styles.header}>
            <h2>Welcome back!</h2>
            <p>Sign in to pick up where you left off.</p>
          </div>

          <form className={styles.form} onSubmit={handleLogin}>
            <Input
              label="Email address"
              type="email"
              placeholder="masadnazir1@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />

            <div className={styles.options}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember me
              </label>

              <a href="#" className={styles.link}>
                Forgot password?
              </a>
            </div>

            {isLoading ? (
              <Button variant="outline" disabled={isLoading}>
                <Loader color="#fff" />
              </Button>
            ) : (
              <Button
                type="submit"
                tone="success"
                icon={FaSignInAlt}
                iconPosition="left"
              >
                Login
              </Button>
            )}

            <div className={styles.divider}>
              <span>or continue with</span>
            </div>
            {/* 
            {isLoading ? (
              ""
            ) : (
              <Button
                variant="outline"
                icon={FaGoogle}
                iconPosition="left"
                disabled
              >
                Sign in with Google
              </Button>
            )} */}
          </form>

          <div className={styles.footer}>
            <p>
              Don’t have an account? <a href="/signup">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
