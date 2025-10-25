import React from "react";
import styles from "./Loader.module.css";
import clsx from "clsx";

interface LoaderProps {
  size?: number | string; // e.g. 24 | "2rem"
  color?: string; // override var(--primary)
  thickness?: number; // border thickness
  speed?: number; // rotation speed in seconds
  type?: "spinner" | "dots";
  label?: string;
  className?: string;
}

export default function Loader({
  size = 32,
  color = "var(--primary)",
  thickness = 3,
  speed = 0.9,
  type = "spinner",
  label,
  className,
}: LoaderProps) {
  const styleVars: React.CSSProperties = {
    "--loader-size": typeof size === "number" ? `${size}px` : size,
    "--loader-color": color,
    "--loader-thickness": `${thickness}px`,
    "--loader-speed": `${speed}s`,
  } as React.CSSProperties;

  if (type === "dots") {
    return (
      <div className={clsx(styles.dotsWrapper, className)} style={styleVars}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        {label && <span className={styles.label}>{label}</span>}
      </div>
    );
  }

  return (
    <div className={clsx(styles.spinnerWrapper, className)} style={styleVars}>
      <div className={styles.spinner}></div>
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}
