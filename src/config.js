export const API_URL = 
window.location.hostname === "localhost" 
    ? "http://localhost:8181" 
    : "https://my-server-example.com/api";

console.log("API_URL :",API_URL);