"use client";
import PageHeaderComponent from "@/components/shared/PageHeaderComponent";
import { DataTable } from "@/components/shared/DataTable";
import { useGetAllProjectTeamMeambers } from "@/hooks/useSelectOptions";
import { columns } from "./columns";

export default function ManageStaffPage() {
  const { isLoading, projectTeamMemberData } = useGetAllProjectTeamMeambers();

  return (
    <div className="space-y-8">
      <div>
        <PageHeaderComponent
          title={`Project Team Member (${projectTeamMemberData?.length ?? 0})`}
          subTitle="View all staff here"
          className="py-8"
        />
      </div>
      <DataTable
        columns={columns}
        data={projectTeamMemberData || []}
        isLoading={isLoading}
      />
    </div>
  );
}
