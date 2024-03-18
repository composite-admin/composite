import TopNav from "@/components/shared/TopNav";
import Sidebar from "@/components/shared/Sidebar";
import { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
  return (
    <main className="grid lg:grid-cols-5 max-w-[120rem] mx-auto">
      <section className="hidden lg:block lg:col-span-1 lg:min-h-screen">
        <Sidebar />
      </section>
      <section className="lg:col-span-4 overflow-y-scroll h-screen bg-[#F5F6F8]">
        <TopNav />
        <div className="py-16 px-4 sm:px-8 lg:px-7 ">{children}</div>
      </section>
    </main>
  );
}
