import { CacheStore } from "@/data/protocols/cache";
import { LocalSavePurchases } from "@/data/useCases";

class CacheStoreSpy implements CacheStore {
  deleteCallsCount = 0;
  key: string;

  delete(key: string): void {
    this.deleteCallsCount++;
    this.key = key;
  }
}

type SutTypes = {
  sut: LocalSavePurchases;
  cacheStore: CacheStoreSpy;
};

const makeSut = (): SutTypes => {
  const cacheStore = new CacheStoreSpy();
  const sut = new LocalSavePurchases(cacheStore);

  return {
    sut,
    cacheStore,
  };
};

describe("LocalSavePurchases", () => {
  it("Should not delete cache on sut.init", () => {
    const { cacheStore } = makeSut();
    expect(cacheStore.deleteCallsCount).toBe(0);
  });

  it("Should delete old cache on sut.save", async () => {
    const { cacheStore, sut } = makeSut();

    await sut.save();

    expect(cacheStore.deleteCallsCount).toBe(1);
    expect(cacheStore.key).toBe("purchases");
  });
});
