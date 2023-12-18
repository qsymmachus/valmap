import stringify from "json-stable-stringify";

/**
 * An extension of the `Map` type that changes how object and array keys are handled.
 * 
 * In a `ValueMap`, object and array keys are considered equal if they have the same
 * value, unlike  an ordinary `Map` where they would only be considered equal if they 
 * shared the same reference.
 */
export class ValueMap<K, V> extends Map<K | string, V> {
  override get(key: K): V | undefined {
    return super.get(serializeKey(key));
  }

  override set(key: K, value: V): this {
    return super.set(serializeKey(key), value);
  }

  override has(key: K): boolean {
    return super.has(serializeKey(key));
  }

  override delete(key: K): boolean {
    return super.delete(serializeKey(key));
  }

  override forEach(
    callbackfn: (value: V, key: K, map: Map<K, V>) => void,
    thisArg?: any
  ): void {
    super.forEach((value: V, key: string | K, map: Map<string | K, V>) => {
      callbackfn(value, deserializeKey<K>(key as string), map as Map<K, V>);
    }, thisArg);
  }

  override keys(): IterableIterator<K> {
    const serializedKeys = [...super.keys()] as string[];
    const deserializedKeys = serializedKeys.map((key) =>
      deserializeKey<K>(key)
    );

    return deserializedKeys[Symbol.iterator]();
  }

  override entries(): IterableIterator<[K, V]> {
    const serializedEntries = [...super.entries()] as [string, V][];
    const deserializedEntries = serializedEntries.map((entry) => [
      deserializeKey<K>(entry[0]),
      entry[1],
    ]);

    return deserializedEntries[Symbol.iterator]() as IterableIterator<[K, V]>;
  }
}

/** Serializes a `key` into a stable representation so we can key anything by value. */
function serializeKey<K>(key: K): string {
  return stringify(key);
}

/** Deserializes a `key` string back to its original value. */
function deserializeKey<K>(key: string): K {
  return JSON.parse(key, reviveDates) as K;
}

/** Regex for the ISO-8601 date string serialized from a `Date`. */
const ISO_8601 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

/** Allows JSON-serialized `Date`s to be revived as `Date`s. */
function reviveDates(_key: any, value: any): Date | any {
  if(typeof value === "string" && ISO_8601.test(value)) {
    return new Date(value);
  }

  return value;
}
