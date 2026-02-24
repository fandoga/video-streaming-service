import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/providers/ReduxProvider";
import Navbar from "@/components/navbar/Navbar";

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
          <Navbar />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
