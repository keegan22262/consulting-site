interface AboutDetailsSectionProps {
  mission: string;
  approach: string;
  whoIntro: string;
  whoBullets: string[];
}

export default function AboutDetailsSection({
  mission,
  approach,
  whoIntro,
  whoBullets,
}: AboutDetailsSectionProps) {
  return (
    <section aria-label="About details">
      <div className="max-w-7xl mx-auto px-6">
        <div className="py-16 md:py-24">
          <div className="mx-auto max-w-prose space-y-12">
            {mission ? (
              <section aria-labelledby="mission-title" className="space-y-3">
                <h2 id="mission-title" className="text-2xl leading-snug">
                  Our Mission
                </h2>
                <p className="leading-relaxed">{mission}</p>
              </section>
            ) : null}

            {approach ? (
              <section aria-labelledby="approach-title" className="space-y-3">
                <h2 id="approach-title" className="text-2xl leading-snug">
                  Our Approach
                </h2>
                <p className="leading-relaxed">{approach}</p>
              </section>
            ) : null}

            {whoIntro || whoBullets.length > 0 ? (
              <section aria-labelledby="who-title" className="space-y-4">
                <h2 id="who-title" className="text-2xl leading-snug">
                  Who We Work With
                </h2>
                {whoIntro ? <p className="leading-relaxed">{whoIntro}</p> : null}
                {whoBullets.length > 0 ? (
                  <ul className="space-y-3">
                    {whoBullets.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden="true">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
