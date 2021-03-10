import axios from "axios";
import { store } from "src/store/store";

// Set Authorization interceptor
axios.interceptors.request.use(config => {
  config.headers.Authorization = store.getState().user.jwt?.token;
  return config;
});

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});
