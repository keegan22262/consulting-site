import SectionWrapper from "@/components-v2/sections/SectionWrapper";

export default function IndustriesHeroSection() {
  return (
    <SectionWrapper background="white" padV={{ mobile: 56, tablet: 72, desktop: 96 }}>
      <div className="max-w-[720px] text-left">
        <h1 className="font-semibold leading-[1.12] tracking-[-0.02em] text-text-primary">
          Industry expertise with operational depth
        </h1>
        <p className="mt-6 text-lg font-medium leading-[1.5] text-text-secondary">
          Context-first, execution-focused industry support.
        </p>
        <p className="mt-8 text-base leading-[1.7] text-text-secondary">
          We work alongside executives across regulated and rapidly changing sectors, pairing domain insight with delivery discipline to reduce risk and accelerate outcomes.
        </p>
      </div>
    </SectionWrapper>
  );
}
