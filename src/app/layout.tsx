import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Chatbot from "../components/Chatbot";
import ConditionalLayout from "./components/ConditionalLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Dollup - Professional Makeup Artistry",
  description: "Transform your beauty with professional makeup services. From bridal makeup to special events, we create stunning transformations that enhance your natural beauty.",
  keywords: "makeup artist, bridal makeup, party makeup, professional makeup, beauty services, makeup booking",
  authors: [{ name: "Dollup Team" }],
  openGraph: {
    title: "Dollup - Professional Makeup Artistry",
    description: "Transform your beauty with professional makeup services",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
        <Chatbot />
      </body>
    </html>
  );
}
