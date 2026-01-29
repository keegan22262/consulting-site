import Link from "next/link";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Services", href: "/services" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

export default function Header() {
  return (
    <header>
      <nav aria-label="Primary">
        <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
          <div className="shrink-0">
            <Link href="/">Firm Name</Link>
          </div>

          <ul className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2">
            {navigationItems.map((item) => (
              <li key={item.href} className="whitespace-nowrap">
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
