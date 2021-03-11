import axios from "axios";
import { userSetToken } from "src/store/actions";
import { store } from "src/store/store";
import { getUserToken } from "./auth";

/** Backend api reference */
export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Set Authorization interceptor
api.interceptors.request.use(async config => {
  const jwt = store.getState().user.jwt;
  if (!jwt) return;
  let token = jwt.token;
  if (Date.now() > jwt.expiration) {
    token = await getUserToken();
    store.dispatch(userSetToken(token));
  }

  config.headers.Authorization = `AuthFire ${token}`;
  return config;
});
