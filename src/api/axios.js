import axios from "axios";

const api = axios.create({
  baseURL: "https://blog-post-backend-qrtf.onrender.com/api", // update to VPS IP later
});

export default api;
