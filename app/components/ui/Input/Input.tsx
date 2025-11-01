"use client";

import React, { forwardRef, useState } from "react";
import styles from "./Input.module.css";
import { IconType } from "react-icons";
import {
  FaEye,
  FaEyeSlash,
  FaCalendarAlt,
  FaFileUpload,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";

export type InputTone = "default" | "success" | "danger" | "warning";
export type InputType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "date"
  | "datetime-local"
  | "file"
  | "textarea"
  | "search"
  | "checkbox"
  | "radio"
  | "select";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  tone?: InputTone;
  type?: InputType;
  icon?: IconType;
  iconPosition?: "left" | "right";
  hint?: string;
  error?: string;
  fullWidth?: boolean;
  rows?: number;
  options?: { label: string; value: string }[]; // for select
}

const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  InputProps
>(
  (
    {
      label,
      tone = "default",
      type = "text",
      icon: Icon,
      iconPosition = "left",
      hint,
      error,
      fullWidth = false,
      rows = 4,
      options = [],
      className,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const toneClass = styles[`tone-${tone}`];
    const hasIcon = !!Icon;

    const renderIcon = (position: "left" | "right") => {
      if (Icon && iconPosition === position)
        return (
          <Icon className={`${styles.icon} ${styles[`icon${position}`]}`} />
        );

      if (type === "file" && position === "right")
        return (
          <FaFileUpload className={`${styles.icon} ${styles.iconRight}`} />
        );
      if (type === "password" && position === "right")
        return (
          <span
            className={`${styles.iconBtn} ${styles.iconRight}`}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        );
      if (
        (type === "date" || type === "datetime-local") &&
        position === "right"
      )
        return (
          <FaCalendarAlt className={`${styles.icon} ${styles.iconRight}`} />
        );
      return null;
    };

    const renderStatusIcon = () => {
      if (!error && tone === "success")
        return (
          <FaCheckCircle className={`${styles.statusIcon} ${styles.success}`} />
        );
      if (tone === "warning")
        return (
          <FaExclamationTriangle
            className={`${styles.statusIcon} ${styles.warning}`}
          />
        );
      if (tone === "danger" || error)
        return (
          <FaTimesCircle className={`${styles.statusIcon} ${styles.danger}`} />
        );
      return null;
    };

    const baseClass = `
      ${styles.inputWrapper}
      ${toneClass}
      ${error ? styles.error : ""}
      ${fullWidth ? styles.fullWidth : ""}
    `;

    const commonProps = {
      ref,
      className: `${styles.input} ${hasIcon ? styles.withIcon : ""}`,
      ...props,
    };

    const renderInput = () => {
      if (type === "textarea")
        return <textarea {...(commonProps as any)} rows={rows} />;
      if (type === "select")
        return (
          <select {...(commonProps as any)}>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      if (type === "checkbox" || type === "radio")
        return <input {...(commonProps as any)} type={type} />;
      return (
        <input
          {...(commonProps as any)}
          type={showPassword && type === "password" ? "text" : type}
        />
      );
    };

    return (
      <div className={`${styles.wrapper} ${className || ""}`}>
        {label && <label className={styles.label}>{label}</label>}

        <div className={baseClass}>
          {renderIcon("left")}
          {renderInput()}
          {renderIcon("right")}
          {renderStatusIcon()}
        </div>

        {error ? (
          <span className={styles.errorText}>{error}</span>
        ) : (
          hint && <span className={styles.hint}>{hint}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
