"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

import Button from "../components/ui/Button/Button";
import Input from "../components/ui/Input/Input";
import PageHead from "../components/ui/PageHead/PageHead";
import styles from "./ContactPage.module.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+92 (21) 1234-5678",
      desc: "Available 24/7",
    },
    {
      icon: Mail,
      title: "Email",
      details: "support@tapcars.pk",
      desc: "We'll respond within 2 hours",
    },
    {
      icon: MapPin,
      title: "Address",
      details: "Karachi, Pakistan",
      desc: "Multiple nationwide locations",
    },
    {
      icon: Clock,
      title: "Hours",
      details: "24/7 Support",
      desc: "Always here for you",
    },
  ];

  return (
    <main className={styles.page}>
      <PageHead
        title="Get in Touch"
        subtitle="We’d love to hear from you. Contact our team any time."
        bgImage=""
        gradientFrom="var(--primary)"
        gradientTo="var(--primary-dark)"
        height="340px"
        overlay
      />

      <section className={styles.section}>
        <div className={styles.grid}>
          {/* Contact Information */}
          <div className={styles.infoGrid}>
            {contactInfo.map(({ icon: Icon, title, details, desc }, i) => (
              <Card key={i}>
                <div className={styles.iconBox}>
                  <Icon size={24} />
                </div>
                <div>
                  <h3>{title}</h3>
                  <p className={styles.details}>{details}</p>
                  <p className={styles.desc}>{desc}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Form */}
          <Card>
            {submitted ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>
                  <Send size={32} />
                </div>
                <h2>Message Sent!</h2>
                <p>Thank you for contacting us. We’ll reply shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.row}>
                  <Input
                    label="Full Name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <Input
                  label="Phone Number"
                  inputMode="tel"
                  placeholder="+92 300 1234567"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                />

                <Input
                  label="Subject"
                  type="text"
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  required
                />

                <div className={styles.field}>
                  <label>Message</label>
                  <textarea
                    rows={6}
                    placeholder="Tell us more about your inquiry..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />
                </div>

                <Button type="submit">Send Message</Button>
              </form>
            )}
          </Card>
        </div>
      </section>
    </main>
  );
}

/* Local lightweight Card */
function Card({ children }: { children: React.ReactNode }) {
  return <div className={styles.card}>{children}</div>;
}
