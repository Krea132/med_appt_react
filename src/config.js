export const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8181"
    : process.env.REACT_APP_API_URL;

console.log("API_URL:", API_URL);
