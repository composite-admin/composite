"use client";
import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./columns";
import { useAddProjectModal } from "@/store/inventory/UseInventoryModal";
import { useGetAllProjectData } from "@/hooks/useSelectOptions";
import { userStore } from "@/store/auth/AuthStore";
import { getCookie } from "cookies-next";
import { useStaffPrivilegeStore } from "@/store/staff/useStaffStore";

export default function ProjectPage() {
  const onOpen = useAddProjectModal((state) => state.onOpen);
  const { userType } = userStore();
  const username = getCookie("username");
  const { projects, isLoading } = useGetAllProjectData();

  const { data: staffPrivilege } = useStaffPrivilegeStore();

  const CAN_CREATE = staffPrivilege?.find(
    (item: any) => item.type === "project"
  )?.can_create;

  return (
    <>
      <PageHead
        headText={`Projects (${projects?.length || 0})`}
        subText="View all your Items here"
        disabled={!CAN_CREATE}
        buttonText="Add Project"
        buttonAction={onOpen}
      />

      <DataTable
        columns={columns}
        data={projects || []}
        isLoading={isLoading}
      />
    </>
  );
}
