import Redis from "ioredis";
import CONFIG from "./config.js";

const { REDIS_URI } = CONFIG;

if (!REDIS_URI) {
  console.error("Redis URI is missing in the configuration");
  process.exit(1);
}

const redisClient = new Redis(REDIS_URI, {
  tls: REDIS_URI.startsWith("rediss://") ? {} : undefined,
  retryStrategy: (times) => Math.min(times * 50, 2000),
});

redisClient.on("connect", () => {
  console.log(
    `Redis connected via ${REDIS_URI.includes("upstash") ? "Upstash" : "self-hosted/local"}`
  );
});

redisClient.on("error", (err) => {
  console.error(`Redis error: ${err.message}`);
});

redisClient.on("close", () => {
  console.log(`Redis connection closed`);
});

["SIGINT", "SIGTERM"].forEach((signal) => {
  process.on(signal, async () => {
    try {
      await redisClient.quit();
      console.log(`Redis connection closed gracefully on ${signal}`);
      process.exit(0);
    } catch (err) {
      console.error(`Error while closing Redis connection on ${signal}`, err);
      process.exit(1);
    }
  });
});

export default redisClient;
