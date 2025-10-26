export const local = {
  set<T>(key: string, value: T): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore quota or serialization errors */
    }
  },

  get<T>(key: string): T | null {
    if (typeof window === "undefined") return null;
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch {
      return null;
    }
  },
  //
  remove(key: string): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  },
  //
  clear(): void {
    if (typeof window === "undefined") return;
    localStorage.clear();
  },
};
