"use client";

import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";

function SkeletonBar({
  width = "100%",
  height = "16px",
  mb = "12px",
}: {
  width?: string;
  height?: string;
  mb?: string;
}) {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "var(--n200)",
        borderRadius: "4px",
        marginBottom: mb,
      }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid var(--n200)",
        borderRadius: "4px",
        padding: "24px",
      }}
    >
      <SkeletonBar width="60%" height="20px" />
      <SkeletonBar width="100%" height="14px" />
      <SkeletonBar width="80%" height="14px" mb="0" />
    </div>
  );
}

export function SkeletonCardGrid({ count = 3 }: { count?: number }) {
  const px = useResponsiveValue({ desktop: "32px", tablet: "32px", mobile: "24px" });
  const desktopCols = count >= 3 ? "repeat(3, 1fr)" : `repeat(${count}, 1fr)`;
  const tabletCols = count >= 2 ? "repeat(2, 1fr)" : "1fr";
  const gridCols = useResponsiveValue({ desktop: desktopCols, tablet: tabletCols, mobile: "1fr" });

  return (
    <div
      style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: `80px ${px}`,
      }}
    >
      <SkeletonBar width="200px" height="12px" />
      <SkeletonBar width="400px" height="28px" mb="32px" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: gridCols,
          gap: "24px",
        }}
      >
        {Array.from({ length: count }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
  );
}

export function SkeletonPage() {
  const px = useResponsiveValue({ desktop: "32px", tablet: "32px", mobile: "24px" });
  const heroTop = useResponsiveValue({ desktop: "104px", tablet: "80px", mobile: "56px" });
  const heroBottom = useResponsiveValue({ desktop: "80px", tablet: "64px", mobile: "48px" });

  return (
    <div style={{ fontFamily: "var(--font-primary)", minHeight: "100vh" }}>
      <div
        style={{
          backgroundColor: "var(--n100)",
          padding: `${heroTop} ${px} ${heroBottom}`,
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <SkeletonBar width="120px" height="12px" />
          <SkeletonBar width="500px" height="36px" />
          <SkeletonBar width="350px" height="18px" mb="0" />
        </div>
      </div>

      <SkeletonCardGrid count={3} />
    </div>
  );
}

export function ContentNotFound({ type = "content" }: { type?: string }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-primary)",
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "64px 24px",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "var(--text-h2)",
          fontWeight: 600,
          color: "var(--n900)",
          marginBottom: "12px",
        }}
      >
        {type.charAt(0).toUpperCase() + type.slice(1)} not found
      </h2>
      <p
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "var(--text-body)",
          color: "var(--n600)",
          maxWidth: "40ch",
        }}
      >
        The {type} you are looking for may have been moved or is no longer available.
      </p>
    </div>
  );
}

export function ContentError({ message }: { message?: string }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-primary)",
        padding: "48px 24px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "var(--text-caption)",
          color: "var(--n500)",
        }}
      >
        {message || "Content is temporarily unavailable. Showing cached version."}
      </p>
    </div>
  );
}

export default function ContentSkeleton() {
  return <SkeletonPage />;
}
