import TopNav from "@/components/Layout/Navbar/TopNav";
import Sidebar from "@/components/shared/Sidebar";
import { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
  return (
    <main className="bg-[#F5F6F8] ">
      <div className="max-w-[140rem] flex mx-auto">
        <div className="hidden lg:block w-[15.5rem] z-50 relative ">
          <Sidebar />
        </div>
        <div className="lg:col-span-5 w-full  lg:w-[calc(100%-15.5rem)] overflow-y-scroll h-screen bg-[#F5F6F8]">
          <TopNav />
          <div className="pb-16 pt-5 px-4 sm:px-8 lg:px-7">{children}</div>
        </div>
      </div>
    </main>
  );
}

