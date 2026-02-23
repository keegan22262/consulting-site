import Link from "next/link";

export interface IndustryCardProps {
  slug: string;
  title: string;
  summary?: string;
  tags?: string[];
}

export default function IndustryCard({ slug, title, summary, tags }: IndustryCardProps) {
  return (
    <Link href={`/industries/${slug}`} className="block h-full">
      <article className="card-hover flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6">
        <header>
          <h3 className="text-sm font-medium tracking-tight text-slate-900">{title}</h3>
          {tags && tags.length > 0 && (
            <p className="mt-1 text-xs text-slate-500">
              {tags.join(" · ")}
            </p>
          )}
        </header>
        {summary && (
          <p className="mt-2 text-sm leading-6 text-slate-600">{summary}</p>
        )}
      </article>
    </Link>
  );
}
