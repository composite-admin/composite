import { useMutation } from "@tanstack/react-query";
import { LoginResponse } from "@/utils/types";
import useAuthStore from "@/store/auth/AuthStore";
import { authApi } from "@/config/api";

const useLogin = () => {
  const { setUser } = useAuthStore();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await authApi.post<LoginResponse>("/login", credentials);
      return response.data;
    },
    onSuccess: (data) => {
      setUser(data.data, data.token);
      console.log(data.data, data.token);
    },
  });

  return { login: mutate, isPending };
};

export default useLogin;
