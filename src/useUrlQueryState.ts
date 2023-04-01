import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useCallback, useEffect } from "react";
import searchParser from "./searchParser";
import asyncReducerQue from "./asyncReducerQue";

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
  defaultValue: T
): [T, (newValue: T) => void] => {
  const currentValue = useRef<T>();

  const location = useLocation();
  const navigate = useNavigate();

  // initialize value from the current route (happens during initial render)
  if (currentValue.current == null) {
    currentValue.current = searchParser(
      location.search,
      paramName,
      defaultValue
    );
  }

  useEffect(() => {
    setResolver((result) => {
      navigate({
        pathname: location.pathname,
        search: result.toString(),
      });
    });
  }, [location.pathname, navigate]);

  const setFunction = useCallback(
    (newValue: T) => {
      if (newValue !== currentValue.current) {
        currentValue.current = newValue;
      }

      const newSearchParam = new URLSearchParams(location.search);
      const jsonString = JSON.stringify(newValue);
      const defaultValueJsonString = JSON.stringify(defaultValue);

      reducerQue.que(
        { paramName, value: jsonString, defaultValue: defaultValueJsonString },
        newSearchParam
      );
    },
    [paramName, location.search, defaultValue]
  );

  return [currentValue.current, setFunction];
};

export default useUrlQueryState;
