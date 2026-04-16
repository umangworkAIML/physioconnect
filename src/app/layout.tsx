import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"], // Added weights for prominent headings
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PhysioJoy by Joyal — Book Physiotherapists, Clinics & More",
  description:
    "PhysioJoy by Joyal — Ahmedabad's premier physiotherapy platform. Book certified physiotherapists for home visits, discover nearby clinics, get online consultations, and shop premium recovery products.",
  keywords: [
    "physiotherapy",
    "Ahmedabad",
    "physiotherapist",
    "home visit",
    "clinic",
    "physio",
    "therapy",
    "pain relief",
    "rehabilitation",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakartaSans.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1 pt-16 md:pt-18">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
