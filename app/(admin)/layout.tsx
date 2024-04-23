import TopNav from "@/components/Layout/Navbar/TopNav";
import Sidebar from "@/components/shared/Sidebar";
import { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
  return (
    <main className="bg-[#F5F6F8] min-h-screen overflow-y-auto ">
      <div className="grid grid-cols-1 lg:grid-cols-6 max-w-[140rem] mx-auto">
        <div className="hidden lg:block lg:col-span-1 z-50">
          <Sidebar />
        </div>
        <div className="lg:col-span-5 w-full overflow-x-scroll lg:h-screen">
          <TopNav />
          <div className="pb-16 pt-5 px-4 sm:px-8 lg:px-7">{children}</div>
        </div>
      </div>
    </main>
  );
}
