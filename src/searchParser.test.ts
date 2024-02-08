import searchParser from "./searchParser";

describe("searchParser", () => {
  it("should get a url property", () => {
    // arrange

    // act
    const result = searchParser(new URLSearchParams("?value=100"), "value", 0);

    // assert
    expect(result).toBe(100);
  });

  it("should get a the default value if the search string does not include the value", () => {
    // arrange

    // act
    const result = searchParser(
      new URLSearchParams("?somethingElse=20"),
      "value",
      0,
    );

    // assert
    expect(result).toBe(0);
  });

  it("should handle complex objects", () => {
    // arrange

    // act
    const result = searchParser(
      new URLSearchParams('?value={"one": 1, "two": "second"}'),
      "value",
      0,
    );

    // assert
    expect(result).toStrictEqual({ one: 1, two: "second" });
  });

  it("should handle invalid json values", () => {
    // arrange

    // act
    const result = searchParser(
      new URLSearchParams('?value={"invalid json"}'),
      "value",
      0,
    );

    // assert
    expect(result).toStrictEqual(0);
  });
});
