const searchParser = <T>(
  searchParams: URLSearchParams,
  paramName: string,
  defaultValue: T,
): T => {
  const stringValue = searchParams.get(paramName);

  if (stringValue == null) {
    return defaultValue;
  }

  try {
    return JSON.parse(stringValue);
  } catch {
    return defaultValue;
  }
};

export default searchParser;
