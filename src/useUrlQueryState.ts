import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useMemo } from "react";
import asyncReducerQue from "./asyncReducerQue";
import searchParser from "./searchParser";

const [reducerQue, setResolver] = asyncReducerQue<
  { paramName: string; value: string; defaultValue: string },
  URLSearchParams
>((result, newValue) => {
  if (newValue.value === newValue.defaultValue) {
    result.delete(newValue.paramName);
  } else {
    result.set(newValue.paramName, newValue.value);
  }

  return result;
});

const useUrlQueryState = <T>(
  paramName: string,
  defaultValue: T,
): [T, (newValue: T) => void] => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentValue = useMemo(() => {
    return searchParser(searchParams, paramName, defaultValue);
  }, [searchParams, paramName, defaultValue]);

  useEffect(() => {
    setResolver((result) => {
      setSearchParams(result);
    });
  }, [setSearchParams]);

  const setFunction = useCallback(
    (newValue: T) => {
      const jsonString = JSON.stringify(newValue);
      const defaultValueJsonString = JSON.stringify(defaultValue);

      reducerQue.que(
        {
          paramName: paramName,
          value: jsonString,
          defaultValue: defaultValueJsonString,
        },
        searchParams,
      );
    },
    [defaultValue, paramName, searchParams],
  );

  return [currentValue, setFunction];
};

export default useUrlQueryState;
