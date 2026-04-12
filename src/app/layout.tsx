import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Straveda — Enterprise IT Consulting & Technology Strategy",
  description:
    "Less complexity, more agility. Straveda delivers enterprise-grade IT consulting, technology strategy, and software solutions — from enterprise architecture to Red Hat middleware — helping organizations transform with confidence since 2010.",
  keywords: [
    "Straveda",
    "Enterprise IT Consulting",
    "Technology Strategy",
    "Enterprise Architecture",
    "Management Consulting",
    "Software Solutions",
    "Red Hat Middleware",
    "Digital Transformation",
    "Cloud Strategy",
    "IT Modernization",
  ],
  authors: [{ name: "Straveda LLC", url: "https://straveda.com" }],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Straveda — Enterprise IT Consulting & Technology Strategy",
    description:
      "Less complexity, more agility. Enterprise IT consulting since 2010.",
    type: "website",
    locale: "en_US",
    siteName: "Straveda",
  },
  twitter: {
    card: "summary_large_image",
    title: "Straveda — Enterprise IT Consulting & Technology Strategy",
    description:
      "Less complexity, more agility. Enterprise IT consulting since 2010.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
