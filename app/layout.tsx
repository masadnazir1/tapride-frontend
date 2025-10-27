import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./scrolbar.css";
import Navbar from "./components/sections/Navbar/Navbar";
import Footer from "./components/sections/Footer/Footer";
import { UserProvider } from "./context/UserContext";

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
    url: "https://tapride.galaxydev.pk",
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
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <UserProvider>
          <Navbar />
          {children}

          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
