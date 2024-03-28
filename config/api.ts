import useAuthStore from "@/store/auth/AuthStore";
import axios, { AxiosError, AxiosRequestConfig } from "axios";



// const onRequest = (
//   config: AxiosRequestConfig
// ): AxiosRequestConfig => {
//   const auth = sessionStorage.getItem("auth");
//   const token = JSON.parse(auth ?? "{}");
//   if (auth) {
//     config.headers!.Authorization = `Bearer ${token.state.token}`;
//   }
//   return config;
// };


export const authApi = axios.create({
  baseURL: "https://composite-port-services.onrender.com",
  headers:  {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Access-Control-Allow-Origin": "*",
  }
});

authApi.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
});
