import axios from "axios";

export const axiosPublic = axios.create({
  baseURL:
    import.meta.env.VITE_NODE_ENV === "development"
      ? "http://localhost:5000"
      : "/mern",
  withCredentials: true,
});
