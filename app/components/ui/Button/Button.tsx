"use client";

import React from "react";
import styles from "./Button.module.css";
import { IconType } from "react-icons";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export type ButtonVariant = "solid" | "outline" | "ghost" | "link";

export type ButtonTone = "primary" | "success" | "danger" | "warning";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  icon?: IconType;
  iconPosition?: "left" | "right";
  loading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "solid",
  tone = "primary",
  icon: Icon,
  iconPosition = "left",
  loading = false,
  children,
  ...props
}) => {
  const toneClass = styles[`tone-${tone}`];
  const variantClass = styles[`variant-${variant}`];

  return (
    <button
      className={`${styles.button} ${toneClass} ${variantClass} ${
        loading ? styles.loading : ""
      }`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <AiOutlineLoading3Quarters className={styles.spinner} />
      ) : (
        Icon &&
        iconPosition === "left" && (
          <Icon className={`${styles.icon} ${styles.iconLeft}`} />
        )
      )}

      <span className={styles.label}>{children}</span>

      {!loading && Icon && iconPosition === "right" && (
        <Icon className={`${styles.icon} ${styles.iconRight}`} />
      )}
    </button>
  );
};

export default Button;
