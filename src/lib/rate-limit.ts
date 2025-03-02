import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const newsletterRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(2, "1 d"),
  analytics: true,
  prefix: "ratelimit:newsletter",
});
