"use client";
import { DataTable } from "@/components/shared/DataTable";
import PageHeaderComponent from "@/components/shared/PageHeaderComponent";
import { useQuery } from "@tanstack/react-query";
import { columns } from "../dashboard/columns";
import { userStore } from "@/store/auth/AuthStore";
import { getStuffTyped } from "@/hooks/useSelectOptions";
import { IRequestData } from "@/utils/types";

export default function StaffRequestPage() {
  const { userId } = userStore();
  const { data, error, isPending } = useQuery({
    queryKey: ["get staffbaord request", userId],
    queryFn: () => getStuffTyped<IRequestData[]>(`/requests/user/${userId}`),
    refetchOnMount: "always",
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
