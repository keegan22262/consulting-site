import { PortableText } from "@portabletext/react";
import SectionWrapper from "@/components-v2/sections/SectionWrapper";
import ArticleSidebar, { CollapsibleTOC, type TOCEntry } from "@/components-v2/ui/ArticleSidebar";

type RelatedServiceLink = { slug: string; label: string };
type RelatedIndustryLink = { id: string; label: string };

interface InsightBodySectionProps {
  contentBlocks: Record<string, unknown>[];
  relatedServices?: RelatedServiceLink[];
  relatedIndustries?: RelatedIndustryLink[];
  shareUrl?: string;
  shareTitle?: string;
  discussionCTA?: { label: string; to: string };
}

export default function InsightBodySection({
  contentBlocks,
  relatedServices = [],
  relatedIndustries = [],
  shareUrl,
  shareTitle,
  discussionCTA,
}: InsightBodySectionProps) {
  const { toc, headingIds } = buildToc(contentBlocks);

  return (
    <SectionWrapper background="white">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,720px)_1fr]">
          <div>
            <CollapsibleTOC toc={toc} />
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
      </div>
    </SectionWrapper>
  );
}

function buildToc(blocks: Record<string, unknown>[]): { toc: TOCEntry[]; headingIds: Map<string, string> } {
  const toc: TOCEntry[] = [];
  const headingIds = new Map<string, string>();
  const counts = new Map<string, number>();

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
