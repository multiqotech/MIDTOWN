import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const montserrat = Montserrat({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MIDTOWN Hospital | Clinic | Diagnostic | Pharmacy — Where Care Meets Excellence",
  description:
    "MIDTOWN Hospital offers world-class healthcare with 100+ expert doctors across 50+ specialties. Book appointments, explore health packages, and experience compassionate care.",
  keywords: [
    "MIDTOWN Hospital",
    "healthcare",
    "clinic",
    "diagnostic",
    "pharmacy",
    "doctors",
    "health packages",
    "appointment",
    "medical care",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        <TopBar />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
