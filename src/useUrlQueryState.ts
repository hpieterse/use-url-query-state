import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useCallback, useEffect } from "react";
import searchParser from "./searchParser";
import asyncReducerQue from "./asyncReducerQue";

const [reducerQue, setResolver] = asyncReducerQue<
  { shortName: string; jsonString: string },
  URLSearchParams
>((result, newValue) => {
  result.set(newValue.shortName, newValue.jsonString);

  return result;
});

const useUrlQueryState = <T>(
  shortName: string,
  defaultValue: T
): [T, (newValue: T) => void] => {
  const currentValue = useRef<T>();

  const location = useLocation();
  const navigate = useNavigate();

  // initialize value from the current route (happens during initial render)
  if (currentValue.current == null) {
    currentValue.current = searchParser(
      location.search,
      shortName,
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

      reducerQue.que({ shortName, jsonString }, newSearchParam);
    },
    [shortName, location.search]
  );

  return [currentValue.current, setFunction];
};

export default useUrlQueryState;
