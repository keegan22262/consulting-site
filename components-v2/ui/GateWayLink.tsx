import Link from "next/link";

interface GatewayLinkProps {
  label: string;
  href: string;
}

export default function GatewayLink({ label, href }: GatewayLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 font-semibold underline underline-offset-4 transition-fast ease-standard hover:opacity-80"
    >
      {label}
      <span>→</span>
    </Link>
  );
}
