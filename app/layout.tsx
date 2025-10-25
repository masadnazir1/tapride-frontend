import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Book a Car | TapRide.pk",
  description:
    "Book rental cars instantly with TapRide.pk – easy, fast, and reliable car rental service across Pakistan.",
  manifest: "/manifest.json",
  keywords: [
    "car rental",
    "TapRide",
    "Pakistan",
    "rent a car",
    "book a car online",
  ],
  openGraph: {
    title: "TapRide.pk — Car Rentals in Pakistan",
    description: "Book and manage your car rentals with ease.",
    url: "https://tapride.pk",
    siteName: "TapRide.pk",
    images: ["/og-image.jpg"],
    locale: "en_PK",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
