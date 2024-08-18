"use client";

import { DataTable } from "@/components/shared/DataTable";
import { columns } from "./columns";

import PageHeaderComponent from "@/components/shared/PageHeaderComponent";
import { useQuery } from "@tanstack/react-query";
import { getAllConsultantData } from "@/store/consultants/useConsultantStore";
import { useStaffPrivilegeStore } from "@/store/staff/useStaffStore";

export default function ConsultantsPage() {
  const { data, error, isPending } = useQuery({
    queryKey: ["get all consultants"],
    queryFn: getAllConsultantData,
    refetchOnMount: "always",
  });
  const { data: staffPrivilege } = useStaffPrivilegeStore();

  const CAN_CREATE = staffPrivilege?.find(
    (item: any) => item.type === "consultant"
  )?.can_create;
  return (
    <div className="space-y-8">
      <div>
        <PageHeaderComponent
          title={`Consultants (${data?.length || 0})`}
          subTitle="View all consultants here"
          disabled={!CAN_CREATE}
          buttonText="Add consultant"
          href="/staff/consultants/add-consultant"
        />
      </div>
      <DataTable
        columns={columns}
        isLoading={isPending}
        data={data ?? []}
      />
    </div>
  );
}
