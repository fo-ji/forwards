export const generateQueryURL = (
  baseUrl: string,
  obj: {
    [key: string]: string | null | undefined | number | boolean;
  },
) => {
  const searchParams = Object.entries(obj).reduce((params, [key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      params.append(key, value.toString());
    }
    return params;
  }, new URLSearchParams());

  const queryString = searchParams.toString();

  if (queryString) {
    return `${baseUrl}?${queryString}`;
  } else {
    return baseUrl;
  }
};
