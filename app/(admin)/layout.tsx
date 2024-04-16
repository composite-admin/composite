import TopNav from "@/components/Layout/Navbar/TopNav";
import Sidebar from "@/components/shared/Sidebar";
import { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
  return (
    <main className="grid lg:grid-cols-5 max-w-[120rem] mx-auto over-flow-hidden">
      <section className="hidden lg:block lg:col-span-1 ">
        <Sidebar />
      </section>
      <section className="lg:col-span-4 overflow-y-scroll lg:h-screen bg-[#F5F6F8]">
        <TopNav />
        <div className="pb-16 pt-5 px-4 sm:px-8 lg:px-7 ">{children}</div>
      </section>
    </main>
  );
}
