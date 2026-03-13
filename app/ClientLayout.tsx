"use client";
import SiteHeader from "@/components-v2/layout/SiteHeader";
import SiteFooter from "@/components-v2/layout/SiteFooter";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Industries index page composes its own nav/footer to preserve 1:1 reference order.
  if (pathname === "/industries") {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
