"use client";
import { useStaffPrivilegeStore } from "@/store/staff/useStaffStore";
import EditClientForm from "./EditClientForm";
import useManageClientStore from "@/store/manage-client/useManageClientStore";
import { BlockEdiComponent } from "@/components/shared/BlockEdit";
import GoBack from "@/components/shared/GoBack";

type Params = {
  params: {
    id: string;
  };
};

export default function EditClientPage({ params }: Params) {
  const { data: staffPrivilege } = useStaffPrivilegeStore();

  const CAN_EDIT = staffPrivilege?.find(
    (item: any) => item.type === "client"
  )?.can_edit;
  const { clientDetailsData } = useManageClientStore();

  if (!CAN_EDIT) {
    return <BlockEdiComponent />;
  }

  return (
    <>
      <GoBack />
      <EditClientForm data={clientDetailsData} />
    </>
  );
}
