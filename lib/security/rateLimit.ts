const rateMap = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(
  ip: string,
  limit: number,
  windowMs: number
): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)

  if (!entry) {
    rateMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (now > entry.resetTime) {
    rateMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (entry.count >= limit) {
    return false
  }

  entry.count++
  return true
}
