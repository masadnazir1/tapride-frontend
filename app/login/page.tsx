"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Login.module.css";
import Button from "../components/ui/Button/Button";
import Input from "../components/ui/Input/Input";
import { FaSignInAlt, FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="TapRides" width={200} height={100} />
        </div>

        <div className={styles.header}>
          <h2>Welcome back!</h2>
          <p>Sign in to pick up where you left off.</p>
        </div>

        <form className={styles.form}>
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

          <Button tone="success" icon={FaSignInAlt} iconPosition="left">
            Login
          </Button>

          <div className={styles.divider}>
            <span>or continue with</span>
          </div>

          <Button variant="outline" icon={FaGoogle} iconPosition="left">
            Sign in with Google
          </Button>
        </form>

        <div className={styles.footer}>
          <p>
            Don’t have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
