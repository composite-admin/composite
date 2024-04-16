"use client";
import DashboardCard from "@/components/Dashboard/DashboardCard";
import { DataTable } from "@/components/shared/DataTable";
import PageHeaderComponent from "@/components/shared/PageHeaderComponent";
import { getAllrequest } from "@/store/requests/RequestStore";
import { useQuery } from "@tanstack/react-query";
import { columns } from "../dashboard/columns";
import useAuthStore from "@/store/auth/AuthStore";

export default function StaffRequestPage() {
  const { user } = useAuthStore();
  const { data, error, isPending } = useQuery({
    queryKey: ["get staffbaord request"],
    queryFn: getAllrequest,
  });

  return (
    <div>
      {/* page header */}
      <PageHeaderComponent
        title={`My request(${data?.length || 0})`}
        subTitle="View all your request here"
        buttonText="New Request"
        href="/staff/create-request"
      />
      {/* grid container */}
      <div className="grid-cols-1">
        <div className="xl:col-span-6">
          <DataTable
            columns={columns}
            isLoading={isPending}
            data={data ?? []}
          />
        </div>
      </div>
    </div>
  );
}
