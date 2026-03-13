import { PortableText } from "@portabletext/react";
import InsightsContentSection from "@/components-v2/sections/InsightsContentSection";

export default function InsightBodySection({ contentBlocks }: { contentBlocks: Record<string, unknown>[] }) {
  return (
    <InsightsContentSection>
      {contentBlocks.length > 0 ? (
        <PortableText
          value={contentBlocks as any}
          components={{
            block: {
              normal: ({ children }) => <p className="mb-6 last:mb-0">{children}</p>,
              h2: ({ children }) => (
                <h2 className="mt-14 mb-6 text-2xl font-semibold leading-[1.2] text-text-primary">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="mt-10 mb-4 text-xl font-semibold leading-[1.25] text-text-primary">{children}</h3>
              ),
            },
            list: {
              bullet: ({ children }) => <ul className="mb-6 list-disc space-y-3 pl-5 last:mb-0">{children}</ul>,
            },
          }}
        />
      ) : null}
    </InsightsContentSection>
  );
}
