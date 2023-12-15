import { ValueMap } from "..";

describe("ValueMap", () => {
  let map: Map<
    string | Record<string | number | symbol, unknown> | any[],
    number
  >;

  const scalar = "foo";

  const object = {
    neat: "cool",
    number: 100,
    nested: {
      boolean: true,
    },
  };
  const objectWithSameValue = {
    neat: "cool",
    number: 100,
    nested: {
      boolean: true,
    },
  };

  const array = ["cat", "dog", "monkey"];
  const arrayWithSameValue = ["cat", "dog", "monkey"];

  beforeEach(() => {
    map = new ValueMap();
  });

  describe("set", () => {
    describe("with scalar keys", () => {
      it("sets a value in the map", () => {
        map.set(scalar, 1);
        expect(map.get(scalar)).toEqual(1);
      });
    });

    describe("with object keys", () => {
      it("sets a value in the map", () => {
        map.set(object, 1);
        expect(map.get(objectWithSameValue)).toEqual(1);
      });
    });

    describe("with array keys", () => {
      it("sets a value in the map", () => {
        map.set(array, 1);
        expect(map.get(arrayWithSameValue)).toEqual(1);
      });
    });
  });
});
