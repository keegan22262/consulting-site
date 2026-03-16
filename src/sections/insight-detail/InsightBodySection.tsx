import { PortableText } from "@portabletext/react";
import Link from "next/link";
import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import ArticleSidebar, { CollapsibleTOC, type TOCEntry } from "@/components-v2/ui/ArticleSidebar";

type RelatedServiceLink = { slug: string; label: string };
type RelatedIndustryLink = { id: string; label: string };

type InsightDataHighlight = { title: string; value: string; detail?: string };

interface InsightBodySectionProps {
  contentBlocks: Record<string, unknown>[];
  summaryPoints?: string[];
  dataHighlights?: InsightDataHighlight[];
  pullQuote?: string;
  sourceUrl?: string;
  relatedServices?: RelatedServiceLink[];
  relatedIndustries?: RelatedIndustryLink[];
  shareUrl?: string;
  shareTitle?: string;
  discussionCTA?: { label: string; to: string };
}

export default function InsightBodySection({
  contentBlocks,
  summaryPoints = [],
  dataHighlights = [],
  pullQuote,
  sourceUrl,
  relatedServices = [],
  relatedIndustries = [],
  shareUrl,
  shareTitle,
  discussionCTA,
}: InsightBodySectionProps) {
  const { toc, headingIds } = buildToc(contentBlocks, summaryPoints, sourceUrl);
  const hasSummary = summaryPoints.length > 0;
  const hasHighlights = dataHighlights.length > 0;
  const hasSource = Boolean(sourceUrl);

  return (
    <SectionWrapper background="white">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,720px)_1fr]">
          <div>
            <CollapsibleTOC toc={toc} />
            {hasSummary ? (
              <div
                id="executive-summary"
                className="rounded-card border border-neutral-200 border-l-4 border-l-[var(--a700)] bg-white p-6 shadow-sm"
              >
                <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-[var(--a700)]">
                  Executive Summary
                </span>
                <div className="mt-4 space-y-4">
                  {summaryPoints.map((point, index) => (
                    <div key={point} className="flex gap-4">
                      <span className="text-xs font-semibold text-[var(--a700)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm leading-[1.7] text-text-secondary">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {hasHighlights ? (
              <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
                {dataHighlights.map((item, index) => (
                  <div key={item.title + index} className="rounded-card border border-neutral-200 bg-white p-6 shadow-sm">
                    <div className="text-sm font-semibold text-text-muted">{item.title}</div>
                    <div className="mt-3 text-2xl font-semibold text-text-primary">{item.value}</div>
                    {item.detail ? <p className="mt-3 text-sm leading-[1.6] text-text-secondary">{item.detail}</p> : null}
                  </div>
                ))}
              </div>
            ) : null}

            {(hasSummary || hasHighlights) ? <div className="mt-10 h-px w-full bg-neutral-100" /> : null}
            <div className="space-y-6 text-base leading-[1.65] text-text-secondary">
              {contentBlocks.length > 0 ? (
                <PortableText
                  value={contentBlocks as any}
                  components={{
                    block: {
                      normal: ({ children }) => <p className="mb-6 last:mb-0">{children}</p>,
                      h2: ({ children, value }) => (
                        <h2
                          id={getHeadingId(value as any, headingIds)}
                          className="mt-14 mb-6 text-2xl font-semibold leading-[1.2] text-text-primary"
                        >
                          {children}
                        </h2>
                      ),
                      h3: ({ children, value }) => (
                        <h3
                          id={getHeadingId(value as any, headingIds)}
                          className="mt-10 mb-4 text-xl font-semibold leading-[1.25] text-text-primary"
                        >
                          {children}
                        </h3>
                      ),
                    },
                    list: {
                      bullet: ({ children }) => (
                        <ul className="mb-6 list-disc space-y-3 pl-5 last:mb-0">{children}</ul>
                      ),
                    },
                  }}
                />
              ) : null}
            </div>

            {pullQuote ? (
              <div className="mt-10 rounded-card border-l-4 border-[var(--a700)] bg-[var(--n50)] p-8 text-text-primary">
                <p className="text-2xl font-semibold italic leading-[1.3]">{pullQuote}</p>
              </div>
            ) : null}

            {hasSource ? (
              <div id="source-attribution" className="mt-10 border-t border-neutral-200 pt-6">
                <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-text-muted">
                  Source & Attribution
                </span>
                <Link
                  href={sourceUrl ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex text-sm text-text-secondary underline decoration-neutral-300 underline-offset-4"
                >
                  {formatSource(sourceUrl ?? "")}
                </Link>
              </div>
            ) : null}

            <Link
              href="/insights"
              className="mt-8 inline-flex text-sm font-semibold text-[var(--a700)]"
            >
              ← Back to Insights
            </Link>
          </div>

          <div className="hidden lg:block">
            <ArticleSidebar
              toc={toc}
              relatedServices={relatedServices}
              relatedIndustries={relatedIndustries}
              shareUrl={shareUrl}
              shareTitle={shareTitle}
              discussionCTA={discussionCTA}
            />
          </div>
        </div>

        {(relatedServices.length > 0 || relatedIndustries.length > 0) ? (
          <div className="mt-10 block lg:hidden">
            {relatedServices.length > 0 ? (
              <div className="mb-6">
                <span className="block text-xs uppercase tracking-[0.06em] text-text-muted mb-2">
                  Related Services
                </span>
                <div className="flex flex-wrap gap-2">
                  {relatedServices.map((svc) => (
                    <a
                      key={svc.slug}
                      href={`/services/${svc.slug}`}
                      className="rounded border border-neutral-200 px-3 py-2 text-sm text-text-secondary transition hover:border-neutral-300"
                    >
                      {svc.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}

            {relatedIndustries.length > 0 ? (
              <div>
                <span className="block text-xs uppercase tracking-[0.06em] text-text-muted mb-2">
                  Related Industries
                </span>
                <div className="flex flex-wrap gap-2">
                  {relatedIndustries.map((ind) => (
                    <a
                      key={ind.id}
                      href={`/industries/${ind.id}`}
                      className="rounded border border-neutral-200 px-3 py-2 text-sm text-text-secondary transition hover:border-neutral-300"
                    >
                      {ind.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </SectionWrapper>
  );
}

function buildToc(
  blocks: Record<string, unknown>[],
  summaryPoints: string[],
  sourceUrl?: string,
): { toc: TOCEntry[]; headingIds: Map<string, string> } {
  const toc: TOCEntry[] = [];
  const headingIds = new Map<string, string>();
  const counts = new Map<string, number>();

  if (summaryPoints.length > 0) {
    toc.push({ id: "executive-summary", label: "Executive Summary" });
  }

  blocks.forEach((block) => {
    const typedBlock = block as { _type?: string; style?: string; children?: { text?: string }[]; _key?: string };
    if (typedBlock._type !== "block") return;
    if (typedBlock.style !== "h2" && typedBlock.style !== "h3") return;
    const text = (typedBlock.children ?? []).map((child) => child.text ?? "").join("").trim();
    if (!text) return;

    const base = slugify(text);
    const count = counts.get(base) ?? 0;
    const nextCount = count + 1;
    counts.set(base, nextCount);
    const id = count > 0 ? `${base}-${nextCount}` : base;
    const key = typedBlock._key ?? id;

    headingIds.set(key, id);
    toc.push({ id, label: text });
  });

  if (sourceUrl) {
    toc.push({ id: "source-attribution", label: "Source & Attribution" });
  }

  return { toc, headingIds };
}

function getHeadingId(value: { _key?: string } | undefined, headingIds: Map<string, string>) {
  if (!value?._key) return undefined;
  return headingIds.get(value._key);
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function formatSource(sourceUrl: string) {
  try {
    return new URL(sourceUrl).hostname.replace("www.", "");
  } catch {
    return sourceUrl;
  }
}
