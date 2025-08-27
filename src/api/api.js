import axios from "axios";

const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://api-booking-ve-be.onrender.com/api";

export const api = axios.create({
  baseURL: API_BASE,
});
