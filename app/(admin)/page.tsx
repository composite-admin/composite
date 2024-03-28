"use client";

// import { DataTable } from "@/components/data-table";
import { DataTable } from "@/components/shared/DataTable";
import { columns } from "./columns";
import { data } from "./data";

import PageHeaderComponent from "@/components/shared/PageHeaderComponent";
import DashboardCard from "@/components/Dashboard/DashboardCard";
import SideCards from "@/components/Dashboard/SideCards";

export default function DashboardPage() {
  return (
    <div>
      {/* page header */}
      <PageHeaderComponent
        title="Welcome, David"
        subTitle="This is your dashboard, an overview of everything going on."
      />
      {/* grid container */}
      <div className="grid-cols-1 gap-8 grid xl:grid-cols-8">
        <div className="xl:col-span-6">
          <div className="pb-12 flex gap-5 py-3 md:overflow-x-visible overflow-x-auto hide">
            <DashboardCard />
            <DashboardCard />
            <DashboardCard />
          </div>
          <DataTable columns={columns} data={data} showSearch={false} />
        </div>

        <div className="xl:col-span-2 grid md:grid-cols-2 xl:grid-cols-1 gap-5 auto-rows-min  place-items-center w-full">
          <SideCards />
          <SideCards />
        </div>
      </div>
    </div>
  );
}
