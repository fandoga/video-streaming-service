import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/shared/components/providers/ReduxProvider";
import Navbar from "@/shared/components/navbar/Navbar";
import Popup from "@/shared/components/popup/Popup";
import Footer from "@/shared/components/footer/Footer";

const poppins = Poppins({
  weight: ["100", "200", "300", "400"],
  subsets: ["latin", "latin-ext"],
  style: ["normal"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Getflix | Video Streamin Service",
  description: "Getflix streaming platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.className} antialiased`}>
        <ReduxProvider>
          <Popup />
          <Navbar />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
