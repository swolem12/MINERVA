export interface CacheEntry<T> {
  key: string;
  data: T;
  cachedAt: string;
  expiresAt?: string;
}

export interface OfflineCacheEngine {
  serializeEntry<T>(key: string, data: T, ttlHours?: number): CacheEntry<T>;
  isExpired(entry: CacheEntry<unknown>): boolean;
}

export function createOfflineCacheEngine(): OfflineCacheEngine {
  return {
    serializeEntry(key, data, ttlHours = 72) {
      const now = new Date();
      const expires = new Date(now);
      expires.setHours(expires.getHours() + ttlHours);
      return {
        key,
        data,
        cachedAt: now.toISOString(),
        expiresAt: expires.toISOString(),
      };
    },

    isExpired(entry) {
      if (!entry.expiresAt) return false;
      return new Date(entry.expiresAt) < new Date();
    },
  };
}
