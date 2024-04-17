import TopNav from "@/components/Layout/Navbar/TopNav";
import Sidebar from "@/components/shared/Sidebar";
import { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
  return (
    <main className="bg-[#F5F6F8] min-h-screen overflow-y-auto">
      <div className="flex max-w-[120rem] mx-auto">
        <div className="hidden lg:block lg:col-span-1 z-50">
          <Sidebar />
        </div>
        <div className="lg:col-span-4 w-full 2xl:container lg:ml-[300px]">
          <TopNav />
          <div className="pb-16 pt-5 px-4 sm:px-8 lg:px-7">{children}</div>
        </div>
      </div>
    </main>
  );
}
