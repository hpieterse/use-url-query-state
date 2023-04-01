import asyncReducerQue from "./asyncReducerQue";

describe("asyncReducerQue", () => {
  it("should que values and resolve in the next tick", async () => {
    // arrange
    const [que, setResolver] = asyncReducerQue(
      (values: number[], value: number) => {
        return [...values, value];
      }
    );

    let resolvedValue: number[] | null = null;
    setResolver((result) => {
      resolvedValue = result;
    });

    //act
    que.que(10, []);

    expect(resolvedValue).toEqual(null);

    // wait for the que to resolve
    await new Promise<void>((r) => r());

    //assert
    expect(resolvedValue).toEqual([10]);
  });

  it("should que multiple values", async () => {
    // arrange
    const [que, setResolver] = asyncReducerQue(
      (values: number[], value: number) => {
        return [...values, value];
      }
    );

    const resolver = jest.fn();
    setResolver(resolver);

    //act
    const initialValue = [0];
    que.que(10, initialValue);
    que.que(20, initialValue);
    que.que(50, initialValue);

    // wait for the que to resolve
    await new Promise<void>((r) => r());

    //assert
    expect(resolver).toHaveBeenCalledTimes(1);
    expect(resolver).toHaveBeenCalledWith([0, 10, 20, 50]);
  });
});
