
import Image from "next/image";
import Button from "@/components-v2/ui/Button";

interface ContactHeroSectionProps {
  title: string;
  intro: string;
  consultationNote: string;
}

export default function ContactHeroSection({
  title,
  intro,
  consultationNote,
}: ContactHeroSectionProps) {
  return (
    <section aria-labelledby="contact-title" className="bg-[#0B2239]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10 md:gap-16 py-16 md:py-24">
        {/* Left: Text Content */}
        <div className="flex-1 min-w-0 max-w-135">
          <header className="space-y-6">
            <h1 id="contact-title" className="text-white text-4xl md:text-5xl font-semibold leading-tight md:leading-[1.08] tracking-tight">
              {title}
            </h1>
            <p className="text-slate-100 text-lg md:text-xl leading-relaxed max-w-[60ch]">
              {intro}
            </p>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-[56ch]">
              {consultationNote}
            </p>
          </header>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Button variant="primary" className="w-full sm:w-auto px-8 py-3 text-base font-semibold" href="#contact-form">
              Schedule an Introduction
            </Button>
            <Button
              variant="secondary"
              className="w-full sm:w-auto px-8 py-3 text-base font-semibold"
              href="/about"
            >
              Learn About Our Firm
            </Button>
          </div>
        </div>
        {/* Right: Image */}
        <div className="flex-1 min-w-0 flex justify-center md:justify-end">
          <div className="w-full max-w-105 aspect-4/3 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/advisory/institutional-01.jpg"
              alt="Advisory team meeting"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 420px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
