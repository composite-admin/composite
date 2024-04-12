import { UserData } from '@/utils/types';
import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

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
  setUserStorage: (
    token: string,
    userType: string | undefined,
    userId: number
  ) => void;
}

export const userStore = create<IUserStoreType>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        userType: null,
        userId: null,
        setUserStorage: (userToken, userType, userId) => {
          set({
            token: userToken,
            userType,
            userId,
          });
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