"use client";

interface IndustryCardProps {
  title: string;
  description: string;
  href: string;
}

export default function IndustryCard({ title, description, href }: IndustryCardProps) {
  return (
    <a
      href={href}
      className="group block overflow-hidden rounded-[12px] bg-white border border-neutral-200 shadow-[0_2px_6px_rgba(0,0,0,0.04)] transition duration-[200ms] ease-out hover:border-neutral-300 hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)]"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-[12px] bg-neutral-200">
        <div className="absolute inset-0 bg-neutral-400 opacity-[0.22] transition duration-[300ms] ease-out group-hover:opacity-[0.35]" />
      </div>

      <div className="p-4 md:p-5 lg:p-6 flex flex-col flex-1">
        <h3 className="text-h3 font-semibold text-neutral-900">
          {title}
        </h3>
        <p className="text-base text-neutral-700 mt-2 flex-1 line-clamp-2">
          {description}
        </p>
        <div className="mt-4 pt-4 border-t border-neutral-200 flex justify-between items-center">
          <span className="text-sm text-neutral-500">Explore industry</span>
          <span className="inline-flex h-5 w-5 items-center justify-center text-accent-700 opacity-0 translate-x-0 transition duration-[200ms] ease group-hover:opacity-100 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </a>
  );
}
