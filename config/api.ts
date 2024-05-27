import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { getCookie, deleteCookie } from "cookies-next";

export interface AxiosErrorResponse extends AxiosRequestConfig {
  error: string;
  message: string;
  response: { data: { message: string } };
}

export const api = axios.create({
  baseURL: "https://composite-port-services.onrender.com",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<AxiosErrorResponse>) => {
    if (error.response) {
      if (error.response.status === 401) {
        deleteCookie("token");
        deleteCookie("user_type");
        deleteCookie("username");
        window.location.href = "/login";
      }
      console.log(error.response.data.message);

      return Promise.reject(error.message);
    } else if (error.request) {
      return Promise.reject(error.request);
    } else {
      return Promise.reject(error);
    }
  }
);


