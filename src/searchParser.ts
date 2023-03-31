const searchParser = <T>(
  searchString: string,
  paramName: string,
  defaultValue: T
): T => {
  const params = new URLSearchParams(searchString);

  const stringValue = params.get(paramName);

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
