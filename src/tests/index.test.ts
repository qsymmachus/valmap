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
      },
      sameValueKey: {
        neat: "cool",
        number: 100,
        nested: {
          boolean: true,
        },
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
});
