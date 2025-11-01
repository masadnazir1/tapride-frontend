"use client";
import { useState, FormEvent } from "react";
import styles from "./Feedback.module.css";
import Button from "../../ui/Button/Button";

export default function Feedback() {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating === 0 || feedback.trim() === "") return;
    // Example: send feedback to API
    // await fetch("/api/feedback", { method: "POST", body: JSON.stringify({ rating, feedback }) });
    setSubmitted(true);
  };

  return (
    <section className={styles.feedbackSection}>
      <div className={styles.card}>
        {!submitted ? (
          <>
            <h2 className={styles.title}>Share Your Experience</h2>
            <p className={styles.subtitle}>
              Help us improve TapRide by leaving your honest feedback
            </p>

            <div className={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`${styles.star} ${
                    star <= (hover || rating) ? styles.active : ""
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                >
                  ★
                </span>
              ))}
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <textarea
                placeholder="Tell us about your experience..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className={styles.textarea}
              />
              <Button type="submit">Submit Feedback</Button>
            </form>
          </>
        ) : (
          <div className={styles.thankYou}>
            <h3>Thank you for your feedback!</h3>
            <p>We appreciate you helping us make TapRide better.</p>
          </div>
        )}
      </div>
    </section>
  );
}
