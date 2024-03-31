import { useMutation } from "@tanstack/react-query";
import { LoginResponse } from "@/utils/types";
import useAuthStore, { userStore } from "@/store/auth/AuthStore";
import { api } from "@/config/api";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const useLogin = () => {
  const { setUser } = useAuthStore();
  const router = useRouter();
  const { setUserStorage } = userStore();
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (credentials: { email: string; password: string }) => {
      try {
        const response = await api.post<LoginResponse>("/login", credentials);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message);
        } else {
          throw error;
        }
      }
    },
    onSuccess: (data) => {
      setUser(data.data, data.token);
      setCookie("user_type", data.data.user_type?.toLowerCase(), {
        maxAge: 60 * 60 * 2,
      });
      setCookie("token", data.token, { maxAge: 60 * 60 * 2 });
      setUserStorage(data.token, data.data.user_type?.toLowerCase());
      router.refresh();
    },
    onError: (error: Error) => {
      return error;
    },
  });

  return { login: mutate, isPending, isSuccess, isError, error };
};

export default useLogin;
