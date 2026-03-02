
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
      className="group relative block overflow-hidden rounded-[12px] bg-white border border-neutral-200 shadow-[0_2px_6px_rgba(0,0,0,0.04)] transition duration-[200ms] ease-out hover:border-neutral-300 hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)]"
    >
      <div className="p-4 md:p-5 lg:p-6 space-y-2">
        <span className="text-[13px] font-semibold uppercase tracking-wide text-neutral-500 block">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-h3 font-semibold text-neutral-900">
          {title}
        </h3>
        <p className="text-base text-neutral-700 mt-2">
          <span className="font-semibold text-neutral-900">Focus:</span> {focusAreas}
        </p>
        <p className="text-base text-neutral-700 mt-2">
          {approach}
        </p>
        <div className="mt-4 flex items-center justify-between text-base text-accent-700">
          <span className="text-sm text-neutral-500">Explore service</span>
          <span className="inline-flex h-5 w-5 items-center justify-center text-accent-700 opacity-0 translate-x-0 transition duration-[200ms] ease group-hover:opacity-100 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
