type ServiceCardProps = {
  title: string;
  summary: string;
  category: string;
};

export default function ServiceCard({ title, summary, category }: ServiceCardProps) {
  return (
    <article className="rounded-xl border p-6">
      <header className="space-y-3">
        <p className="text-sm leading-6">{category}</p>
        <h3 className="text-lg leading-snug">{title}</h3>
      </header>
      <p className="mt-3 leading-relaxed">{summary}</p>
    </article>
  );
}
