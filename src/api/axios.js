import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // update to VPS IP later
});

export default api;
