import stringify from "json-stable-stringify";

/**
 * An extension of the `Map` type that changes how object and array keys are handled.
 * 
 * In a `ValueMap`, object and array keys are considered equal if they have the same
 * value, unlike  an ordinary `Map` where they would only be considered equal if they 
 * shared the same reference.
 */
export class ValueMap<K, V> extends Map<K | string, V> {
  /** Duplicate the original keys in a separate map so they can revived. */
  private readonly originalKeys: Map<string, K>

  constructor(entries?: readonly (readonly [K, V])[] | null) {
    super(entries);
    this.originalKeys = new Map();

    if (entries) {
      entries.forEach(([key, _]) => {
        this.setOriginalKey(key);
      })
    }
  }

  override get(key: K): V | undefined {
    return super.get(serializeKey(key));
  }

  override set(key: K, value: V): this {
    this.setOriginalKey(key);
    return super.set(serializeKey(key), value);
  }

  override has(key: K): boolean {
    return super.has(serializeKey(key));
  }

  override delete(key: K): boolean {
    this.deleteOriginalKey(key);
    return super.delete(serializeKey(key));
  }

  override clear(): void {
    this.originalKeys.clear();
    return super.clear();
  }

  override forEach(
    callbackfn: (value: V, key: K, map: Map<K, V>) => void,
    thisArg?: any
  ): void {
    super.forEach((value: V, key: string | K, map: Map<string | K, V>) => {
      callbackfn(value, this.getOriginalKey(key as string)!, map as Map<K, V>);
    }, thisArg);
  }

  override keys(): IterableIterator<K> {
    return this.originalKeys.values();
  }

  override entries(): IterableIterator<[K, V]> {
    const serializedEntries = [...super.entries()] as [string, V][];
    const deserializedEntries = serializedEntries.map((entry) => [
      this.getOriginalKey(entry[0]),
      entry[1],
    ]);

    return deserializedEntries[Symbol.iterator]() as IterableIterator<[K, V]>;
  }

  private getOriginalKey(serializedKey: string): K | undefined {
    return this.originalKeys.get(serializedKey);
  }

  private setOriginalKey(key: K): void {
    this.originalKeys.set(serializeKey(key), key);
  }

  private deleteOriginalKey(key: K): void {
    this.originalKeys.delete(serializeKey(key));
  }
}

/** Serializes a `key` into a stable representation so we can key anything by value. */
function serializeKey<K>(key: K): string {
  return stringify(key);
}
