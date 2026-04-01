import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ClientLayout from "./ClientLayout";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rillsingh.com"),
  title: {
    default: "Rill Singh Limited | Pan-African Institutional Advisory",
    template: "%s | Rill Singh Limited",
  },
  description:
    "Rill Singh Limited is a pan-African advisory firm delivering integrated consulting across strategy, digital transformation, financial advisory, and governance.",
  openGraph: {
    type: "website",
    url: "https://rillsingh.com",
    siteName: "Rill Singh Limited",
    title: "Rill Singh Limited | Pan-African Institutional Advisory",
    description:
      "Rill Singh Limited is a pan-African advisory firm delivering integrated consulting across strategy, digital transformation, financial advisory, and governance.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rill Singh Limited — Pan-African Institutional Advisory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rill Singh Limited | Pan-African Institutional Advisory",
    description:
      "Rill Singh Limited is a pan-African advisory firm delivering integrated consulting across strategy, digital transformation, financial advisory, and governance.",
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
    name: "Rill Singh Limited",
    url: "https://rillsingh.com",
    logo: "https://rillsingh.com/images/logo.png",
    description:
      "Rill Singh Limited is a pan-African advisory firm delivering integrated consulting across strategy, digital transformation, financial advisory, and governance.",
    sameAs: [
      "https://www.linkedin.com/company/rill-singh-limited",
    ],
  };
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0A1628" />
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
