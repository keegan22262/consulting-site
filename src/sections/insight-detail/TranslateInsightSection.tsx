import Link from "next/link";

const ACTION_IMAGES: Record<string, string> = {
  "Digital Infrastructure":
    "https://images.unsplash.com/photo-1761141535640-c78744c4f369?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY29tbWFuZCUyMGNlbnRlciUyMGRpZ2l0YWwlMjB0cmFuc2Zvcm1hdGlvbiUyMGRhcmt8ZW58MXx8fHwxNzczMjM2NzU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Digital Transformation":
    "https://images.unsplash.com/photo-1761141535640-c78744c4f369?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY29tbWFuZCUyMGNlbnRlciUyMGRpZ2l0YWwlMjB0cmFuc2Zvcm1hdGlvbiUyMGRhcmt8ZW58MXx8fHwxNzczMjM2NzU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Financial Inclusion":
    "https://images.unsplash.com/photo-1741900025120-82118e692965?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBhZHZpc29yeSUyMGludmVzdG1lbnQlMjBiYW5raW5nJTIwb2ZmaWNlfGVufDF8fHx8MTc3MzIzNjc1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Public Sector":
    "https://images.unsplash.com/photo-1592801950918-4ce512022ca9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwYWR2aXNvcnklMjBwYXJsaWFtZW50JTIwYnVpbGRpbmclMjBtb2Rlcm58ZW58MXx8fHwxNzczMjM2NzU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Operations & Supply Chain":
    "https://images.unsplash.com/photo-1769144256181-698b8f807066?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzaGlwcGluZyUyMGNvbnRhaW5lciUyMHBvcnQlMjBsb2dpc3RpY3MlMjBhZXJpYWx8ZW58MXx8fHwxNzczMjM0NDY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Cybersecurity & Risk":
    "https://images.unsplash.com/photo-1655036387197-566206c80980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjeWJlcnNlY3VyaXR5JTIwb3BlcmF0aW9ucyUyMGNlbnRlciUyMGRhcmslMjBzY3JlZW5zfGVufDF8fHx8MTc3MzIzNDQ2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "AI & Governance":
    "https://images.unsplash.com/photo-1737505599159-5ffc1dcbc08f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwbmV1cmFsJTIwbmV0d29yayUyMGFic3RyYWN0fGVufDF8fHx8MTc3MzE2MDA5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Tax & Compliance":
    "https://images.unsplash.com/photo-1635322039171-4b9f2e0d5337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0YXglMjBhZHZpc29yeSUyMHdlYWx0aCUyMG1hbmFnZW1lbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzczMjM2NzU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "SME Development":
    "https://images.unsplash.com/photo-1734254807102-fbf62b0cc513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzbWFsbCUyMGJ1c2luZXNzJTIwbWFya2V0cGxhY2UlMjBBZnJpY2FuJTIwZW50cmVwcmVuZXVyfGVufDF8fHx8MTc3MzIzNDQ2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "ESG & Sustainability":
    "https://images.unsplash.com/photo-1630404991412-9504d094e8ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzdXN0YWluYWJpbGl0eSUyMEVTRyUyMGNvbnN1bHRpbmclMjBncmVlbiUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3MzIzNjc1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Macroeconomic Outlook":
    "https://images.unsplash.com/photo-1694434948850-ed51bd461733?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxMYWdvcyUyME5haXJvYmklMjBtb2Rlcm4lMjBjaXR5c2NhcGUlMjBlY29ub21pYyUyMGdyb3d0aHxlbnwxfHx8fDE3NzMyMzQ0NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Delivery & Execution":
    "https://images.unsplash.com/photo-1764810815228-b7f9432eec5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxleGVjdXRpdmUlMjBzdHJhdGVneSUyMGJvYXJkcm9vbSUyMGNvcnBvcmF0ZSUyMG1vZGVybnxlbnwxfHx8fDE3NzMyMzY3NTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Institutional Resilience":
    "https://images.unsplash.com/photo-1758873272869-9130397ff7d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxwZW9wbGUlMjBvcmdhbml6YXRpb24lMjB0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG1vZGVybiUyMG9mZmljZXxlbnwxfHx8fDE3NzMyMzY3NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Climate & Risk":
    "https://images.unsplash.com/photo-1706737373564-7747084180f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjbGltYXRlJTIwY2hhbmdlJTIwZmxvb2RpbmclMjBpbmR1c3RyaWFsJTIwY29hc3RhbCUyMHJpc2t8ZW58MXx8fHwxNzczMjM0NDc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

const DEFAULT_ACTION_IMAGE =
  "https://images.unsplash.com/photo-1764810815228-b7f9432eec5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxleGVjdXRpdmUlMjBzdHJhdGVneSUyMGJvYXJkcm9vbSUyMGNvcnBvcmF0ZSUyMG1vZGVybnxlbnwxfHx8fDE3NzMyMzY3NTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export default function TranslateInsightSection({ category }: { category?: string }) {
  const image = category ? ACTION_IMAGES[category] : undefined;

  return (
    <section className="bg-[#F8FAFC] py-14 md:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <div className="h-[2px] w-12 bg-[var(--a700)]" />
            <h2 className="mt-6 text-[1.5rem] font-semibold leading-[1.2] text-[#0F1720] md:text-[1.875rem]">
              Translate Insight into Action
            </h2>
            <p className="mt-4 max-w-[52ch] text-base leading-[1.7] text-[#475569]">
              Understanding the landscape is the first step. Our advisory teams help institutions convert analysis into
              execution — designing strategies, mobilizing delivery systems, and building the institutional capacity
              needed to respond to these forces at scale.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-lg bg-[#1B3A5C] px-7 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#0C1C2E]"
              >
                Discuss this Insight
              </Link>
              <Link
                href="/services"
                className="rounded-lg border border-[#CBD5E1] px-7 py-3 text-center text-sm font-semibold text-[#1B3A5C] transition hover:border-[#94A3B8]"
              >
                Explore Advisory Services
              </Link>
            </div>
          </div>

          <div className="relative h-[280px] overflow-hidden rounded-xl md:h-[340px] lg:h-[400px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image ?? DEFAULT_ACTION_IMAGE})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(12,28,46,0.08)] to-[rgba(12,28,46,0.25)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
