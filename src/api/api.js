// import axios from "axios";

// const API_BASE = "http://localhost:5000/api";

// export const api = axios.create({
//   baseURL: API_BASE,
// });


import axios from "axios";

const API_BASE = "https://api-booking-ve-be.onrender.com/api";

export const api = axios.create({
  baseURL: API_BASE,
});