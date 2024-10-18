export const buildQueryString = (params) => {
  const queryString = Object.keys(params)
    .map((key) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
    })
    .join("&");
  return queryString ? `?${queryString}` : "";
};
