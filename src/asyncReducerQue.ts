export type asyncReducerQue<TValue, TResult> = {
  que: (value: TValue, initialValue: TResult) => Promise<void>;
};

export type OnResolve<TResult> = (result: TResult) => void;
export type SetResolver<TResult> = (onResolve: OnResolve<TResult>) => void;

const asyncReducerQue = <TValue, TResult>(
  reduce: (result: TResult, value: TValue) => TResult
): [asyncReducerQue<TValue, TResult>, SetResolver<TResult>] => {
  const changeQue: Array<TValue> = [];
  let resolver: OnResolve<TResult> | null = null;
  return [
    {
      que: async (value, initialValue) => {
        const positionInQue = changeQue.push(value);

        // break thread
        // allow multiple callers in the same thread, and then resolve all at the same time
        await new Promise<void>((r) => r());

        // only handle the result of the last item in the que
        if (positionInQue != changeQue.length) {
          return;
        }

        if (resolver != null) {
          const result = changeQue.reduce(reduce, initialValue);
          resolver(result);
        }
      },
    },
    (onResolve) => {
      resolver = onResolve;
    },
  ];
};

export default asyncReducerQue;
