import Container from "../layout/Container";

const services = [
  {
    title: "Strategy & Growth",
    description:
      "Market positioning, portfolio choices, and growth roadmaps grounded in evidence and aligned to your operating realities.",
  },
  {
    title: "Operating Model",
    description:
      "Org design, decision rights, and cross-functional ways of working that improve speed, accountability, and execution.",
  },
  {
    title: "Transformation Delivery",
    description:
      "Program structure, governance, and hands-on delivery support for initiatives that need momentum and measurable outcomes.",
  },
  {
    title: "Analytics & Performance",
    description:
      "KPI design, reporting clarity, and performance rhythms that keep teams focused on what matters most.",
  },
] as const;

export default function Services() {
  return (
    <section aria-labelledby="services-title">
      <Container>
        <div className="py-18">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="services-title">Services</h2>
            <p className="mt-4">
              Practical support across strategy, advisory, and execution—designed for
              leaders who value clarity and follow-through.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div key={service.title} className="space-y-3">
                <h3 className="text-base">{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
