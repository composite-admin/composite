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
    let errorMessage = "An unknown error occurred";
    if (error.response) {
      if (error.response.status === 401) {
        deleteCookie("token");
        deleteCookie("user_type");
        deleteCookie("username");
        window.location.href = "/login";
      }
      errorMessage = error.response.data.message;
    } else if (error.request) {
      errorMessage = "No response received from server";
    } else {
      errorMessage = error.message;
    }

    console.log(errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
);