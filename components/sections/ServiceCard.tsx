import Link from "next/link";

import Reveal from "../ui/Reveal";

type ServiceCardProps = {
  id: string;
  title: string;
  summary: string;
  category: string;
};

export default function ServiceCard({ id, title, summary, category }: ServiceCardProps) {
  return (
    <Link href={`/services/${id}`} className="block h-full">
			<Reveal className="h-full">
				<article className="card-hover flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6">
					<header>
						<p className="text-xs font-medium uppercase tracking-wide text-slate-600">{category}</p>
						<h3 className="mt-3 text-sm font-medium tracking-tight text-slate-900">{title}</h3>
					</header>
					<p className="mt-2 text-sm leading-6 text-slate-600">{summary}</p>
				</article>
			</Reveal>
    </Link>
  );
}
