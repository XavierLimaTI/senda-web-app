/**
 * Simple Rate Limiter using in-memory storage
 * For production, use Redis (@upstash/ratelimit)
 */

interface RateLimitStore {
  [key: string]: { count: number; resetTime: number }
}

const store: RateLimitStore = {}
const CLEANUP_INTERVAL = 60000 // 1 minute

// Cleanup old entries every minute
setInterval(() => {
  const now = Date.now()
  for (const key in store) {
    if (store[key].resetTime < now) {
      delete store[key]
    }
  }
}, CLEANUP_INTERVAL)

export interface RateLimitConfig {
  limit: number
  windowMs: number // milliseconds
}

/**
 * Simple rate limiter
 * @param identifier - Unique identifier (IP, user ID, email, etc)
 * @param config - { limit: number, windowMs: number }
 * @returns { success: boolean, remaining: number, resetTime: number }
 */
export function rateLimit(identifier: string, config: RateLimitConfig) {
  const now = Date.now()
  const key = identifier
  const existing = store[key]

  // First request or window expired
  if (!existing || existing.resetTime < now) {
    store[key] = {
      count: 1,
      resetTime: now + config.windowMs,
    }
    return {
      success: true,
      remaining: config.limit - 1,
      resetTime: store[key].resetTime,
    }
  }

  // Within window
  existing.count++
  const remaining = Math.max(0, config.limit - existing.count)
  const exceeded = existing.count > config.limit

  return {
    success: !exceeded,
    remaining,
    resetTime: existing.resetTime,
  }
}

/**
 * Get the client IP from request
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip')
  return ip || 'unknown'
}
