import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { getCookie } from "cookies-next";
import { data } from "../app/(admin)/cash-advance/data";

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
      return Promise.reject(error.response.data);
    } else if (error.request) {
      return Promise.reject(error.request);
    } else {
      return Promise.reject(error);
    }
  }
);

// john@example.com
// john123456
