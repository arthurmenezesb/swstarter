const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface CacheEntry<T> {
  data: T;
  lastFetched: Date;
}

class Cache {
  private static instance: Cache;
  private store = new Map<string, CacheEntry<any>>();

  private constructor() {}

  public static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache();
    }
    return Cache.instance;
  }

  get<T>(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) {
      return null;
    }

    const now = new Date();
    if (now.getTime() - entry.lastFetched.getTime() < CACHE_DURATION) {
      return entry.data;
    }

    this.store.delete(key);
    return null;
  }

  set<T>(key: string, data: T) {
    this.store.set(key, {
      data,
      lastFetched: new Date(),
    });
  }
}

export const cache = Cache.getInstance();