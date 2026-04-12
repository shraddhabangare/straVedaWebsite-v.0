import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Straveda — Enterprise IT Consulting & Technology Strategy",
  description: "Provide Exceptional Value. Deliver Cost-Effective Solutions. Guarantee Customer Satisfaction. Enterprise Architecture, Technology Strategy, Management Consulting & Software Solutions.",
  keywords: ["Straveda", "Enterprise IT Consulting", "Technology Strategy", "Enterprise Architecture", "Management Consulting", "Software Solutions", "Red Hat Middleware"],
  authors: [{ name: "Straveda LLC" }],
  openGraph: {
    title: "Straveda — Enterprise IT Consulting & Technology Strategy",
    description: "Less complexity, more agility. Enterprise IT consulting since 2010.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
