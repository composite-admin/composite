import { ReactNode } from "react";
import QueryProvider from "./query-provider";
import AuthProvider from "./auth-provider";
import { FramerModalProvider } from "@/utils/modalContext";
import { ModalProvider } from "./modal-provider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <QueryProvider>
        <ModalProvider />
        <FramerModalProvider>{children}</FramerModalProvider>
      </QueryProvider>
    </AuthProvider>
  );
};

export default Providers;
