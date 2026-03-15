"use client";
import { Suspense } from "react";
import SiteHeader from "@/components-v2/layout/SiteHeader";
import SiteFooter from "@/components-v2/layout/SiteFooter";
import PreviewBanner from "@/components-v2/ui/PreviewBanner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Industries index page composes its own nav/footer to preserve 1:1 reference order.
  if (pathname === "/industries") {
    return (
      <>
        {children}
        <Suspense fallback={null}>
          <PreviewBannerGate />
        </Suspense>
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
      <Suspense fallback={null}>
        <PreviewBannerGate />
      </Suspense>
    </>
  );
}

function PreviewBannerGate() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const previewActive = searchParams?.get("preview") === "true";

  const handleExitPreview = () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.delete("preview");
    router.replace(`${url.pathname}${url.search}${url.hash}`);
  };

  return <PreviewBanner active={previewActive} onExit={handleExitPreview} />;
}
