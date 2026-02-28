import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border-subtle bg-background-primary">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-16 border-b border-border-subtle pb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h3 className="text-xl font-semibold text-text-primary">
                Explore strategic engagement
              </h3>
              <p className="mt-3 text-sm text-text-secondary max-w-md">
                Partner with RSL to design durable institutional advantage across capital, governance, and transformation.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-card bg-accent-primary text-white transition-fast ease-standard hover:opacity-90"
            >
              Start a conversation
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">RSL</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Institutional advisory across strategy, capital architecture,
              digital transformation, and governance.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link href="/services" className="space-x-2 transition-fast ease-standard hover:text-accent-primary">All Services</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">Insights</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link href="/insights" className="space-x-2 transition-fast ease-standard hover:text-accent-primary">Research & Perspectives</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link href="/about" className="space-x-2 transition-fast ease-standard hover:text-accent-primary">About</Link></li>
              <li><Link href="/contact" className="space-x-2 transition-fast ease-standard hover:text-accent-primary">Contact</Link></li>
              <li><Link href="/privacy-policy" className="space-x-2 transition-fast ease-standard hover:text-accent-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="space-x-2 transition-fast ease-standard hover:text-accent-primary">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-text-secondary">
          <Link href="#" className="transition-fast ease-standard hover:text-accent-primary">LinkedIn</Link>
          <Link href="#" className="transition-fast ease-standard hover:text-accent-primary">Twitter</Link>
          <Link href="#" className="transition-fast ease-standard hover:text-accent-primary">YouTube</Link>
          <Link href="#" className="transition-fast ease-standard hover:text-accent-primary">WhatsApp</Link>
          <Link href="#" className="transition-fast ease-standard hover:text-accent-primary">TikTok</Link>
          <Link href="#" className="transition-fast ease-standard hover:text-accent-primary">Facebook</Link>
          <Link href="#" className="transition-fast ease-standard hover:text-accent-primary">Instagram</Link>
          <Link href="mailto:info@rsl.com" className="transition-fast ease-standard hover:text-accent-primary">Email</Link>
        </div>
        <div className="mt-16 text-xs text-text-muted border-t border-border-subtle pt-6">
          © {new Date().getFullYear()} RSL Advisory. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
