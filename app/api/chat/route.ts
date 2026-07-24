import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(8, "1 h"),
  analytics: true,
});

const JIBU_SYSTEM_PROMPT = `You are Jibu, the AI assistant for Rill Singh Limited, a Pan-African institutional advisory firm based in Nairobi, Kenya. Rill Singh advises governments, investors, and enterprises across ten disciplines (strategy & transformation, finance & risk & regulation, sustainability & public impact, growth & communications) and eleven sectors (including financial services, public sector & government, energy & natural resources, industrials & manufacturing).

When visitors ask genuine consulting, strategy, or business questions — market entry, digital transformation, ESG, financial regulation, or any topic within the advisory domain — answer substantively and thoughtfully, the way a knowledgeable senior consultant would. Don't limit yourself to canned FAQ answers; genuinely reason through the question.

Embody the firm's identity: institutional rigor, ground truth (judgment formed inside the markets you operate in, not observed from a distance), and execution focus (measured by what actually changes, not the weight of the deck).

Do not:
- Quote specific prices, fees, or contractual terms on the firm's behalf — invite the visitor to start a conversation with the team for that.
- Give binding legal, tax, or regulatory advice as if you were a licensed professional.
- Fabricate client names, case studies, or specific past engagements.
- Answer questions with no genuine connection to consulting, business, or the firm — politely decline and redirect.

Tone: confident, precise, professional. Keep responses focused and scannable — typically 150-350 words. For multi-part questions, a short list of 3-5 points is fine, but keep each point to 2-3 sentences. When it fits, invite the visitor to start a real conversation with the team for anything needing deeper engagement.`;

type ChatMessage = { role: "user" | "assistant"; content: string };

const MAX_HISTORY = 8;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        { error: "You've reached the message limit for now — please try again later, or start a conversation with our team directly." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const rawMessages = Array.isArray(body?.messages) ? body.messages : [];

    const sanitized: ChatMessage[] = rawMessages
      .filter(
        (m: unknown): m is { role: string; content: string } =>
          typeof m === "object" &&
          m !== null &&
          ((m as any).role === "user" || (m as any).role === "assistant") &&
          typeof (m as any).content === "string" &&
          (m as any).content.trim().length > 0
      )
      .map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content.trim().slice(0, 2000),
      }))
      .slice(-MAX_HISTORY);

    if (sanitized.length === 0) {
      return NextResponse.json({ error: "Please enter a valid message." }, { status: 400 });
    }

    const response = await anthropic.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 2000,
      system: JIBU_SYSTEM_PROMPT,
      messages: sanitized,
    });

    const answer = response.content
      .filter((block) => block.type === "text")
      .map((block) => (block.type === "text" ? block.text : ""))
      .join("\n");

    if (response.stop_reason === "max_tokens") {
      console.warn("Jibu response was truncated by max_tokens limit");
    }

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Jibu API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again in a moment." },
      { status: 500 }
    );
  }
}
