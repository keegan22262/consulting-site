import Link from "next/link";

import Reveal from "../ui/Reveal";

type ServiceCardProps = {
	id: string;
	title: string;
	summary: string;
	category: string;
	engagementType?: string;
	timeHorizon?: string;
	operationalScope?: string;
};

export default function ServiceCard(props: ServiceCardProps) {
	const { id, title, summary, category, engagementType, timeHorizon, operationalScope } = props;
	const meta = [engagementType, timeHorizon, operationalScope].filter(Boolean);
	return (
		<Link href={`/services/${id}`} className="block h-full">
			<Reveal className="h-full">
				<article className="card-hover flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6">
					<header>
						<p className="text-xs font-medium uppercase tracking-wide text-slate-600">{category}</p>
						<h3 className="mt-3 text-sm font-medium tracking-tight text-slate-900">{title}</h3>
						{meta.length > 0 && (
							<p className="mt-1 text-xs text-slate-500">
								{meta.join(" · ")}
							</p>
						)}
					</header>
					<p className="mt-2 text-sm leading-6 text-slate-600">{summary}</p>
				</article>
			</Reveal>
		</Link>
	);
}
