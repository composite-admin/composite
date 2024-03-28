import { columns } from "@/app/(admin)/dashboard/columns";
import { data } from "@/app/(admin)/dashboard/data";
import DashboardCard from "@/components/Dashboard/DashboardCard";
import { DataTable } from "@/components/shared/DataTable";
import PageHeaderComponent from "@/components/shared/PageHeaderComponent";

export default function StaffDashboardPage() {
  return (
    <div>
      {/* page header */}
      <PageHeaderComponent
        title="Welcome, David"
        subTitle="This is your dashboard, an overview of everything going on."
        buttonText="New Request"
      />
      {/* grid container */}
      <div className="grid-cols-1">
        <div className="xl:col-span-6">
          <div className="pb-12 flex gap-5 py-3 md:overflow-x-visible overflow-x-auto hide">
            <DashboardCard />
            <DashboardCard />
            <DashboardCard />
            <DashboardCard />
          </div>
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}