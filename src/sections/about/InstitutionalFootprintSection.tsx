"use client";

const INDUSTRIES = [
  "Financial Services",
  "Technology",
  "Energy",
  "Healthcare",
  "Public Sector",
  "Real Estate",
  "Manufacturing",
  "Education",
  "Media",
  "Logistics",
  "Professional Services",
];

export default function InstitutionalFootprintSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* LEFT SIDE */}
          <div className="w-full lg:w-1/2">
            <span
              className="block text-[12px] uppercase tracking-[4px] mb-3"
              style={{
                fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                color: "#5483B3",
              }}
            >
              INSTITUTIONAL REACH
            </span>
            <h2
              className="text-[34px] mb-5"
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                fontWeight: 400,
                color: "#021024",
              }}
            >
              Institutional Footprint.
            </h2>
            <p
              className="text-[15px] leading-[1.75]"
              style={{
                fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                color: "#4A4A4A",
              }}
            >
              Global and regional advisory engagements across emerging and
              established markets. Our teams operate on the ground in key African
              economic hubs, with connectivity to international advisory networks.
              Our advisory work spans industries, institutions, and geographies —
              helping organizations navigate complex transformation challenges.
            </p>

            {/* Industry tags */}
            <div className="flex flex-wrap gap-2.5 mt-8">
              {INDUSTRIES.map((industry) => (
                <span
                  key={industry}
                  className="text-[12px] px-4 py-1.5 rounded-[20px]"
                  style={{
                    fontFamily:
                      "var(--font-dm-sans), 'DM Sans', sans-serif",
                    backgroundColor: "#F8FBFF",
                    border: "1px solid rgba(84,131,179,0.15)",
                    color: "#052659",
                  }}
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE — Map image */}
          <div className="w-full lg:w-1/2">
            <div className="relative overflow-hidden rounded-xl shadow-2xl">
              <img
                src="/images/about/footprint-map.jpg"
                alt="Global advisory presence - world and Africa map"
                className="w-full h-[300px] md:h-[400px] lg:h-[460px] object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
