import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./scrolbar.css";
import Navbar from "./components/sections/Navbar/Navbar";
import Footer from "./components/sections/Footer/Footer";
import { UserProvider } from "./context/UserContext";
import { Toaster } from "react-hot-toast";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://tapride.galaxydev.pk"),
  title: {
    default: "Book a Car | TapRide.pk",
    template: "%s | TapRide.pk",
  },
  description:
    "Book verified rental cars instantly with TapRide.pk — Pakistan’s trusted car rental platform for daily, weekly, and monthly rides.",
  manifest: "/manifest.json",
  keywords: [
    "TapRide",
    "car rental Pakistan",
    "rent a car Lahore",
    "rent a car Karachi",
    "rent a car Islamabad",
    "self drive car rental",
    "book a car online",
    "TapRide.pk",
    "galaxy",
    "dev",
    "galaxydev.pk",
    "pk",
    "sasti",
    "cheap",
    "sasti cars",
    "gari",
    "affordable car hire Pakistan",
  ],
  openGraph: {
    title: "Book a Car Online | TapRide.pk — Reliable Car Rentals in Pakistan",
    description:
      "Browse, compare, and book cars for rent across Pakistan with TapRide.pk. Affordable, fast, and fully verified rentals.",
    url: "https://tapride.galaxydev.pk",
    siteName: "TapRide.pk",
    images: [
      {
        url: "https://tapride.galaxydev.pk/images/og/main-og.jpg",
        width: 1200,
        height: 630,
        alt: "Book cars for rent in Pakistan — TapRide.pk",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@TapRidePK",
    title: "Book a Car with TapRide.pk",
    description:
      "Instant car rental booking platform in Pakistan — rent cars safely and easily through TapRide.pk.",
    images: ["https://tapride.galaxydev.pk/images/og/main-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },
  alternates: {
    canonical: "https://tapride.galaxydev.pk",
    languages: {
      "en-PK": "https://tapride.galaxydev.pk",
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#19ce43ff" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <UserProvider>
          <Navbar />
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                fontFamily: "Inter, sans-serif",
                fontSize: "0.875rem",
                borderRadius: "0.5rem",
                padding: "1rem",
              },
            }}
          />
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
