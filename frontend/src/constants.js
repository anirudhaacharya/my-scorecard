export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000/api/entries/"
    : "http://52.63.34.54:8000/api/entries/";
