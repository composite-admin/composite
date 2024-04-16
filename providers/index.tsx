import { ReactNode } from "react";
import QueryProvider from "./query-provider";
import AuthProvider from "./auth-provider";
import { FramerModalProvider } from "@/utils/modalContext";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <QueryProvider>
        <FramerModalProvider>{children}</FramerModalProvider>
      </QueryProvider>
    </AuthProvider>
  );
};

export default Providers;
