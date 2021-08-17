import { CacheStore } from "@/data/protocols/cache";

class LocalSavePurchases {
  constructor(private readonly cacheStore: CacheStore) {}

  async save(): Promise<void> {
    this.cacheStore.delete("purchases");
  }
}

export { LocalSavePurchases };
