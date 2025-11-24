import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HatesAway - Throw Your Hates Away",
  description: "A therapeutic web app where you can draw your frustrations and watch them get thrown into the trash. Express yourself, release stress, and share with the community.",
  keywords: ["stress relief", "drawing", "therapy", "emotional release", "creative expression"],
  authors: [{ name: "HatesAway Team" }],
  openGraph: {
    title: "HatesAway - Throw Your Hates Away",
    description: "Draw your frustrations and throw them away. A fun, therapeutic web experience.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "HatesAway - Throw Your Hates Away",
    description: "Draw your frustrations and throw them away.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
