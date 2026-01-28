import Link from "next/link";

type ServiceCardProps = {
  id: string;
  title: string;
  summary: string;
  category: string;
};

export default function ServiceCard({ id, title, summary, category }: ServiceCardProps) {
  return (
    <Link href={`/services/${id}`} className="block">
      <article className="rounded-xl border p-6 hover:border-slate-300 hover:bg-slate-50">
        <header className="space-y-3">
          <p className="text-sm leading-6">{category}</p>
          <h3 className="text-lg leading-snug">{title}</h3>
        </header>
        <p className="mt-3 leading-relaxed">{summary}</p>
      </article>
    </Link>
  );
}
