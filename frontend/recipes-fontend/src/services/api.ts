import axios from "axios";
import { store } from "src/store/store";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Set Authorization interceptor
api.interceptors.request.use(config => {
  config.headers.Authorization = `AuthFire ${store.getState().user.jwt?.token}`;
  return config;
});
