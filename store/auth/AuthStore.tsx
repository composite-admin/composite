import { UserData } from '@/utils/types';
import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import { deleteCookie } from "cookies-next";
import useClientStore from "../client/useClientStore";

interface AuthStore {
  user: UserData | null;
  token: string | null;
  pwd_status: number | null;
  setUser: (user: UserData, token: string) => void;
  clearUser: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  pwd_status: null,
  setUser: (user, token) => set({ user, token }),
  clearUser: () => set({ user: null, token: null }),
}));

export default useAuthStore;

interface IUserStoreType {
  userType: string | null;
  userId: string | null;
  username: string | null;
  id: number | null;

  logOut: () => void;
  setUserStorage: (
    userType: string | undefined,
    userId: string | null,
    username: string | null,
    id: number | null
  ) => void;
}

export const userStore = create<IUserStoreType>()(
  devtools(
    persist(
      (set) => ({
        userType: null,
        userId: null,
        username: null,
        id: null,
        setUserStorage: (userType, userId, username, id) => {
          set({
            userType,
            userId,
            username,
            id,
          });
        },
        logOut: () => {
          set({
            userType: null,
            userId: null,
            username: null,
            id: null,
          });

          deleteCookie("token");
          deleteCookie("user_type");
          deleteCookie("username");
          deleteCookie("pwd_status");
          useClientStore.getState().setTabType("Project Details");
        },
      }),
      {
        name: "user_info",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);


interface IEmail {
  email: string | null;
  setEmail: (email: string | null) => void;
}

export const ForgotPasswordStore = create<IEmail>()(
  devtools(
    persist(
      (set) => ({
        email: null,
        setEmail: (email: string | null) => {
          set({
            email,
          });
        },
      }),
      {
        name: "email",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

  
  
//   (set) => ({
//   userType: null,
//   token: null,
//   setUser: () => {
//     const { user, token } = useAuthStore.getState();
//     set({
//       userType: user?.user_type,
//       token: token,
//     });
//   },
// }));