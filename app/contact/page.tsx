"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import api from "../utils/api";
import toast from "react-hot-toast";
import Loader from "../components/ui/Loader/Loader";
import Head from "next/head";
import Button from "../components/ui/Button/Button";
import Input from "../components/ui/Input/Input";
import PageHead from "../components/ui/PageHead/PageHead";
import styles from "./ContactPage.module.css";
import axios from "axios";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setloading] = useState(false);

  async function submitForm(e: any) {
    e.preventDefault();
    try {
      if (
        !formData.name ||
        !formData.email ||
        !formData.phone ||
        !formData.subject ||
        !formData.message
      ) {
        toast.error("Please fill  all the form fields and try again");
        return;
      }

      setloading(true);
      const res: any = await api.post("/contact", {
        full_name: formData.name,
        email: formData.email,
        phone_number: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });

      if (res?.code == 201) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setloading(false);
      }
      setloading(false);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (err.status === 400) {
          toast.error(err?.response?.data?.message);
          setloading(false);
        }
      } else {
        console.error("Something went wrong , try later");
        setloading(false);
      }
      setloading(false);
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+92 3408882796",
      desc: "Available 24/7",
    },
    {
      icon: Mail,
      title: "Email",
      details: "support@TapRide.pk",
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
    <>
      <Head>
        <title>Contact Us - TapRide</title>
        <meta
          name="description"
          content="Get in touch with TapRide. Contact our team via phone, email, or our form for support, inquiries, and more."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Contact Us - TapRide" />
        <meta
          property="og:description"
          content="Get in touch with TapRide. Contact our team via phone, email, or our form for support, inquiries, and more."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tapride.pk/contact" />
        <meta
          property="og:image"
          content="https://www.tapride.pk/images/contact-og.jpg"
        />
        <link rel="canonical" href="https://www.tapride.pk/contact" />
      </Head>

      <main className={styles.page}>
        <PageHead
          title="Get in Touch"
          subtitle="We’d love to hear from you. Contact our team any time."
          bgImage="/images/bg.jpg"
          overlay={true}
          overlayColor="rgba(0, 0, 0, 0.75)" // optional light tint
          gradientFrom="transparent"
          gradientTo="transparent"
          height="340px"
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
                <form className={styles.form}>
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
                    placeholder="+92 340 888**96"
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

                  {loading ? (
                    <Button disabled={loading}>
                      <Loader />
                    </Button>
                  ) : (
                    <Button onClick={(e) => submitForm(e)}>Send Message</Button>
                  )}
                </form>
              )}
            </Card>
          </div>
        </section>
      </main>
    </>
  );
}

/* Local lightweight Card */
function Card({ children }: { children: React.ReactNode }) {
  return <div className={styles.card}>{children}</div>;
}
