export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-03-01'

export const dataset = safeValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'production',
  'NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = safeValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'placeholder',
  'NEXT_PUBLIC_SANITY_PROJECT_ID'
)

function safeValue(v: string | undefined, fallback: string, name: string): string {
  if (v === undefined || v.trim() === '') {
    console.warn(`[sanity] Missing environment variable: ${name} — using fallback "${fallback}"`)
    return fallback
  }
  return v
}
