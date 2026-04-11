"use client";

const CLIENT_SEGMENTS = [
  {
    title: "Startups",
    description:
      "Essential foundations: strategy, finance, tax, and go-to-market.",
    borderColor: "#5483B3",
  },
  {
    title: "SMEs",
    description:
      "Scaling with structure: operations, compliance, digital enablement, and growth.",
    borderColor: "#7DA0CA",
  },
  {
    title: "Mid-size & Large Organizations",
    description:
      "Transformation: operating model, risk, technology, people, and ESG.",
    borderColor: "#C1E8FF",
  },
];

export default function MissionClientSegmentsSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* LEFT SIDE — Content */}
          <div className="w-full lg:w-[55%] order-2 lg:order-1">
            <span
              className="block text-[12px] uppercase tracking-[4px] mb-3"
              style={{
                fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                color: "#5483B3",
              }}
            >
              OUR MISSION
            </span>
            <h2
              className="text-[34px] mb-5"
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                fontWeight: 400,
                color: "#021024",
              }}
            >
              Our Mission.
            </h2>
            <p
              className="text-[15px] leading-[1.75]"
              style={{
                fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                color: "#4A4A4A",
              }}
            >
              To deliver comprehensive, innovative solutions that drive
              sustainable growth and transformation for startups, SMEs, and
              enterprises - globally - through strategy, technology integration,
              financial optimization, and human capital development.
            </p>

            {/* Client Segments */}
            <div className="mt-8">
              <h3
                className="text-[20px] font-semibold mb-5"
                style={{
                  fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                  color: "#021024",
                }}
              >
                Client Segments
              </h3>

              <div className="flex flex-col gap-5">
                {CLIENT_SEGMENTS.map((segment) => (
                  <div
                    key={segment.title}
                    className="rounded-[10px] px-6 py-5"
                    style={{
                      backgroundColor: "#F8FBFF",
                      borderLeft: `3px solid ${segment.borderColor}`,
                    }}
                  >
                    <h4
                      className="text-[16px] font-semibold"
                      style={{
                        fontFamily:
                          "var(--font-dm-sans), 'DM Sans', sans-serif",
                        color: "#021024",
                      }}
                    >
                      {segment.title}
                    </h4>
                    <p
                      className="text-[14px] mt-1"
                      style={{
                        fontFamily:
                          "var(--font-dm-sans), 'DM Sans', sans-serif",
                        color: "#6B7280",
                      }}
                    >
                      {segment.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — Image collage */}
          <div className="w-full lg:w-[45%] order-1 lg:order-2">
            <div className="relative">
              {/* Main image */}
              <div className="relative w-full h-[320px] md:h-[440px] lg:h-[500px] rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="/images/about/mission-main.jpg"
                  alt="RSL team collaboration"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Small overlapping image — hidden on mobile */}
              <img
                src="/images/about/mission-overlay.jpg"
                alt="RSL advisory team"
                className="hidden md:block absolute -top-6 -left-6 w-[180px] h-[180px] lg:w-[200px] lg:h-[200px] rounded-xl object-cover z-[2] transition-transform duration-500 hover:scale-105"
                style={{
                  border: "4px solid white",
                  boxShadow: "0 12px 36px rgba(2,16,36,0.15)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
