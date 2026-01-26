import type { ReactNode } from "react";

type ServiceCardProps = {
  title: ReactNode;
  description: ReactNode;
};

export default function ServiceCard({ title, description }: ServiceCardProps) {
  return (
    <article className="space-y-3">
      <h3 className="text-base">{title}</h3>
      <p>{description}</p>
    </article>
  );
}
