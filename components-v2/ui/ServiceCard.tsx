
import Link from "next/link";

interface ServiceCardProps {
  slug: string;
  title: string;
  focusAreas: string;
  approach: string;
  index: number;
}

export default function ServiceCard({ slug, title, focusAreas, approach, index }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${slug}`}
      className="group block relative bg-background-primary border border-border-subtle rounded-card p-8 transition-fast ease-standard hover:border-border-strong hover:shadow-sm"
    >
      <span className="text-xs uppercase tracking-wide text-muted mb-2 block">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="text-h3 font-semibold transition-fast ease-standard group-hover:text-accent-primary">
        {title}
      </h3>
      <p className="text-sm mt-4">
        <span className="font-bold">Focus:</span> {focusAreas}
      </p>
      <p className="text-sm mt-2 max-w-prose">
        {approach}
      </p>
      <span className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 text-accent-primary text-xl">
        &rarr;
      </span>
    </Link>
  );
}
