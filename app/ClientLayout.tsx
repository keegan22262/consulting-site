"use client";
import SiteHeader from "@/components-v2/layout/SiteHeader";
import SiteFooter from "@/components-v2/layout/SiteFooter";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
