import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import dotenv from 'dotenv';
dotenv.config();

// Applying a rate limit of 10 requests per 10 seconds
// to improve server and prevent crashes
const redis = Redis.fromEnv();
const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10 , '20 s'),
});

export default ratelimit;
