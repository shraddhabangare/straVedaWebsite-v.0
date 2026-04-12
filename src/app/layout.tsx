import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

/* ------------------------------------------------------------------ */
/*  JSON-LD Structured Data for SEO                                   */
/* ------------------------------------------------------------------ */

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "Straveda LLC",
      "url": "https://straveda.com",
      "logo": "https://straveda.com/logo.png",
      "description":
        "Enterprise IT consulting, technology strategy, and software solutions.",
      "foundingDate": "2010",
      "foundingLocation": {
        "@type": "Place",
        "name": "Plano, Texas"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "",
        "addressLocality": "Plano",
        "addressRegion": "TX",
        "postalCode": "75024",
        "addressCountry": "US"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "info@straveda.com",
        "contactType": "customer service",
        "availableLanguage": "English"
      },
      "sameAs": [
        "https://linkedin.com/company/straveda",
        "https://twitter.com/straveda",
        "https://github.com/straveda"
      ]
    },
    {
      "@type": "WebSite",
      "name": "Straveda",
      "url": "https://straveda.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://straveda.com/?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What industries do you serve?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We work across financial services, healthcare, government, energy, and technology sectors. Our deep enterprise expertise translates across industries."
          }
        },
        {
          "@type": "Question",
          "name": "How long does a typical engagement last?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Engagements vary from focused 4-week assessments to multi-year transformation programs. We scope each project to deliver measurable results at every milestone."
          }
        },
        {
          "@type": "Question",
          "name": "Do you work with existing IT teams?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. We embed within your teams to upskill, mentor, and transfer knowledge. Our goal is to make your organization self-sufficient."
          }
        },
        {
          "@type": "Question",
          "name": "What makes Straveda different from other consultancies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We deliver exceptional value per dollar invested with zero hidden costs. Our open-standards approach avoids vendor lock-in, and we guarantee customer satisfaction."
          }
        },
        {
          "@type": "Question",
          "name": "Can you handle enterprise-scale deployments?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We specialize in Red Hat Enterprise Middleware and large-scale architecture. Our team has deployed solutions serving millions of users across Fortune 500 companies."
          }
        },
        {
          "@type": "Question",
          "name": "How do we get started?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Simple — reach out via our contact form or email us at info@straveda.com. We offer a free initial consultation to assess your needs and propose a tailored approach."
          }
        }
      ]
    },
    {
      "@type": "Service",
      "name": "Enterprise Architecture",
      "provider": { "@type": "Organization", "name": "Straveda LLC" },
      "description":
        "We evolve your application portfolio using adaptive, open-standards architecture. Our solutions increase reliability, maintainability and interoperability — reducing technical debt while enabling agile practices.",
      "areaServed": "United States"
    },
    {
      "@type": "Service",
      "name": "Technology Strategy",
      "provider": { "@type": "Organization", "name": "Straveda LLC" },
      "description":
        "We align your IT investments with business goals, creating clear roadmaps that accelerate time to market and position you for sustainable growth.",
      "areaServed": "United States"
    },
    {
      "@type": "Service",
      "name": "Management Consulting",
      "provider": { "@type": "Organization", "name": "Straveda LLC" },
      "description":
        "Expert Product, Program & Project management delivered through meticulous planning and execution. We eliminate bottlenecks and drive enterprise delivery.",
      "areaServed": "United States"
    },
    {
      "@type": "Service",
      "name": "Software Solutions",
      "provider": { "@type": "Organization", "name": "Straveda LLC" },
      "description":
        "We deploy Red Hat Enterprise Middleware and virtualization solutions that lower total cost of ownership and maximize application performance.",
      "areaServed": "United States"
    }
  ]
};

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
  alternates: {
    canonical: "https://straveda.com"
  },
  robots: {
    index: true,
    follow: true
  }
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
