import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ClientLayout from "./ClientLayout";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"),
  title: {
    default: "Consulting Partners",
    template: "%s | Consulting Partners",
  },
  description:
    "Senior-level advisory support for strategy, risk, and transformation—focused on clear decisions and measurable outcomes.",
  openGraph: {
    type: "website",
    title: {
      default: "Consulting Partners",
      template: "%s | Consulting Partners",
    },
    description:
      "Senior-level advisory support for strategy, risk, and transformation—focused on clear decisions and measurable outcomes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rill Singh Consulting",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    logo: process.env.NEXT_PUBLIC_SITE_URL + "/logo.png",
    sameAs: [],
  };
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
