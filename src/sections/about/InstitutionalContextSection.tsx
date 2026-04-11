"use client";

export default function InstitutionalContextSection() {
  return (
    <section className="bg-white pt-[100px] pb-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* LEFT SIDE — Image with decorative border */}
          <div className="w-full lg:w-[45%]">
            <div className="relative">
              {/* Decorative border behind image — hidden on mobile */}
              <div
                className="hidden md:block absolute top-3 left-3 w-full h-full rounded-xl border-2 -z-[1]"
                style={{ borderColor: "#C1E8FF" }}
              />

              {/* Main image */}
              <div className="relative w-full h-[320px] md:h-[480px] lg:h-[520px] rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="/images/about/firm-main.jpg"
                  alt="RSL advisory and boardroom setting"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Accent card — hidden on mobile */}
              <div
                className="hidden md:flex absolute -bottom-5 -right-5 items-center gap-3 rounded-xl px-7 py-5 z-10"
                style={{ backgroundColor: "#052659" }}
              >
                {/* Globe icon */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#7DA0CA"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span
                  className="text-[13px] text-white font-medium"
                  style={{
                    fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                  }}
                >
                  Pan-African & Emerging Markets
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — Content */}
          <div className="w-full lg:w-[55%]">
            <span
              className="block text-[12px] uppercase tracking-[4px] mb-3"
              style={{
                fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                color: "#5483B3",
              }}
            >
              THE FIRM
            </span>
            <h2
              className="text-[34px] mb-5"
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                fontWeight: 400,
                color: "#021024",
              }}
            >
              Institutional Context.
            </h2>

            <p
              className="text-[15px] leading-[1.75]"
              style={{
                fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                color: "#4A4A4A",
              }}
            >
              Rill Singh Limited (RSL) is a pan-African advisory firm established
              to address a persistent structural gap in the consulting market: the
              fragmentation between strategic advice and operational execution. Too
              often, organizations engage multiple firms for strategy, technology,
              finance, people, and compliance - then absorb the coordination cost
              themselves. The result is delayed outcomes, diluted accountability,
              and eroded momentum.
            </p>

            <p
              className="mt-4 text-[15px] leading-[1.75]"
              style={{
                fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                color: "#4A4A4A",
              }}
            >
              RSL was designed to close that gap. The firm brings end-to-end
              capability under one roof - strategy and corporate transformation,
              digital and AI, financial advisory and risk, people and
              organizational effectiveness, sustainability and ESG, and
              public-sector advisory - delivered through small, senior teams
              operating within a shared governance and methodology framework.
            </p>

            {/* Feature highlight rows */}
            <div className="mt-7 flex flex-col gap-5">
              {/* Row 1 */}
              <div className="flex items-start gap-3.5">
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#C1E8FF" }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#052659"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div>
                  <h4
                    className="text-[15px] font-semibold"
                    style={{
                      fontFamily:
                        "var(--font-dm-sans), 'DM Sans', sans-serif",
                      color: "#021024",
                    }}
                  >
                    End-to-End Capability
                  </h4>
                  <p
                    className="text-[13px]"
                    style={{
                      fontFamily:
                        "var(--font-dm-sans), 'DM Sans', sans-serif",
                      color: "#6B7280",
                    }}
                  >
                    Strategy, digital, finance, people, and governance under one
                    roof.
                  </p>
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex items-start gap-3.5">
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#C1E8FF" }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#052659"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                </div>
                <div>
                  <h4
                    className="text-[15px] font-semibold"
                    style={{
                      fontFamily:
                        "var(--font-dm-sans), 'DM Sans', sans-serif",
                      color: "#021024",
                    }}
                  >
                    Execution Discipline
                  </h4>
                  <p
                    className="text-[13px]"
                    style={{
                      fontFamily:
                        "var(--font-dm-sans), 'DM Sans', sans-serif",
                      color: "#6B7280",
                    }}
                  >
                    PRIDE philosophy governs every engagement — Precision,
                    Resilience, Integrity, Discipline, Execution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
