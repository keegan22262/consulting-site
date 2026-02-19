import Link from "next/link";

import Reveal from "../ui/Reveal";

type InsightCardProps = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  date: string;
};

function formatInsightDate(date: string) {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(parsed);
}

export default function InsightCard({ slug, title, summary, category, date }: InsightCardProps) {
  return (
		<Reveal className="h-full">
			<article className="card-hover flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6">
				<header>
					<div className="flex items-baseline justify-between gap-4">
						<p className="text-xs font-medium uppercase tracking-wide text-slate-600">
							{category}
						</p>
						<time dateTime={date} className="text-xs text-slate-600">
							{formatInsightDate(date)}
						</time>
					</div>

					<h3 className="mt-3 text-sm font-medium tracking-tight text-slate-900">
						<Link
							href={`/insights/${slug}`}
							aria-label={`Read insight: ${title}`}
							className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
						>
							{title}
						</Link>
					</h3>
				</header>

				<p className="mt-2 text-sm leading-6 text-slate-600">{summary}</p>
			</article>
		</Reveal>
  );
}
