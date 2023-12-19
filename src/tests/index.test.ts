import { ValueMap } from "..";

describe("ValueMap", () => {
  let map: Map<
    string | Record<string | number | symbol, unknown> | any[],
    number
  >;

  const testCases = {
    scalar: {
      key: "foo",
      sameValueKey: "foo",
    },
    object: {
      key: {
        neat: "cool",
        number: 100,
        nested: {
          boolean: true,
        },
        date: new Date('2023-01-01'),
      },
      sameValueKey: {
        neat: "cool",
        number: 100,
        nested: {
          boolean: true,
        },
        date: new Date('2023-01-01'),
      },
    },
    array: {
      key: ["cat", "dog", "monkey"],
      sameValueKey: ["cat", "dog", "monkey"],
    }
  }

  beforeEach(() => {
    map = new ValueMap();
  });

  describe("set and get", () => {
    Object.entries(testCases).forEach(test => {
      const keyType = test[0];
      const fixtures = test[1];

      describe(`with ${keyType} keys`, () => {
        it("sets a value in the map", () => {
          map.set(fixtures.key, 1);
          expect(map.get(fixtures.sameValueKey)).toEqual(1);
        });
    
        it("returns `undefined` if the value isn't set", () => {
          expect(map.get(fixtures.key)).toEqual(undefined);
        });
      });
    });
  });

  describe("has", () => {
    Object.entries(testCases).forEach(test => {
      const keyType = test[0];
      const fixtures = test[1];
      
      describe(`with ${keyType} keys`, () => {
        it("returns `true` if the key is set", () => {
          map.set(fixtures.key, 1);
          expect(map.has(fixtures.key)).toEqual(true);
        });
    
        it("returns `false` if the value is not set", () => {
          expect(map.has(fixtures.key)).toEqual(false);
        });
      });
    });
  });

  describe("delete", () => {
    Object.entries(testCases).forEach(test => {
      const keyType = test[0];
      const fixtures = test[1];

      describe(`with ${keyType} keys`, () => {
        it("deletes the values stored at the key", () => {
          map.set(fixtures.key, 1);
          expect(map.has(fixtures.key)).toEqual(true);
  
          map.delete(fixtures.key);
          expect(map.has(fixtures.key)).toEqual(false);
          expect(map.get(fixtures.key)).toEqual(undefined);
        })
      });
    });
  });

  describe("lear", () => {
    Object.entries(testCases).forEach(test => {
      const keyType = test[0];
      const fixtures = test[1];

      describe(`with ${keyType} keys`, () => {
        it("clears all data from the map", () => {
          map.set(fixtures.key, 1);
          expect(map.has(fixtures.key)).toEqual(true);
  
          map.clear();
          expect(map.has(fixtures.key)).toEqual(false);
          expect(map.get(fixtures.key)).toEqual(undefined);
        })
      });
    });
  });

  describe("forEach", () => {
    Object.entries(testCases).forEach(test => {
      const keyType = test[0];
      const fixtures = test[1];

      describe(`with ${keyType} keys`, () => {
        it('applies the callback function to each key and value', () => {
          const value = 1;
          const callback = {
            fn: (_key: unknown, _value: unknown) => {
              return;
            },
          };
          const callbackSpy = jest.spyOn(callback, 'fn');
  
          map.set(fixtures.key, value);
          map.forEach(callback.fn)
  
          expect(callbackSpy).toHaveBeenCalledWith(value, fixtures.key, map);
        });
      });
    });
  });

  describe("keys", () => {
    Object.entries(testCases).forEach(test => {
      const keyType = test[0];
      const fixtures = test[1];

      describe(`with ${keyType} keys`, () => {
        it('returns all the keys in the map', () => {
          map.set(fixtures.key, 1);

          const expectedKeys = [fixtures.key];
          const actualKeys = [...map.keys()];

          expect(actualKeys).toEqual(expectedKeys);
        })
      });
    });
  });

  describe("entries", () => {
    Object.entries(testCases).forEach(test => {
      const keyType = test[0];
      const fixtures = test[1];

      describe(`with ${keyType} keys`, () => {
        it('returns all the entries in the map', () => {
          map.set(fixtures.key, 1);

          const expectedEntries = [[fixtures.key, 1]];
          const actualEntries = [...map.entries()];

          expect(actualEntries).toEqual(expectedEntries);
        });
      });
    });
  });
});
