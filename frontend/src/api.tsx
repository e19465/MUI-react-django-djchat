import axios from "axios";
export const MEDIA_URL = "http://localhost:8000";
export const BASE_URL = "http://localhost:8000/api";

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

// Add headers to the instance
instance.defaults.headers.common["Authorization"] = "Bearer your_token_here";

export default instance;
