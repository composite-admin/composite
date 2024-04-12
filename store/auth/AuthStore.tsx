import { UserData } from '@/utils/types';
import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import { deleteCookie } from "cookies-next";

interface AuthStore {
  user: UserData | null;
  token: string | null;
  setUser: (user: UserData, token: string) => void;
  clearUser: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  setUser: (user, token) => set({ user, token }),
  clearUser: () => set({ user: null, token: null }),
}));

export default useAuthStore;

interface IUserStoreType {
  token: string | null;
  userType: string | null;
  userId: number | null;
  username: string | null;
  logOut: () => void;
  setUserStorage: (
    token: string,
    userType: string | undefined,
    userId: number,
    username: string | null
  ) => void;
}

export const userStore = create<IUserStoreType>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        userType: null,
        userId: null,
        username: null,
        setUserStorage: (userToken, userType, userId, username) => {
          set({
            token: userToken,
            userType,
            userId,
            username,
          });
        },
        logOut: () => {
          set({
            token: null,
            userType: null,
            userId: null,
            username: null,
          });

          deleteCookie("token");
          deleteCookie("user_type");
        },
      }),
      {
        name: "token",
        storage: createJSONStorage(() => sessionStorage),
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