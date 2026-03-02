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
    default: "Rill Singh Limited",
    template: "%s | Rill Singh Limited",
  },
  description:
    "Institutional advisory across strategy, digital, finance, risk, sustainability, and public sector transformation.",
  openGraph: {
    type: "website",
    url: "https://rillsingh.com",
    siteName: "Rill Singh Limited",
    title: "Rill Singh Limited",
    description:
      "Institutional advisory across strategy, digital, finance, risk, sustainability, and public sector transformation.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Rill Singh Limited",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@rillsingh",
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
