"use client";

import EditTenantForm from "@/components/forms/MultiStepFoms/EditTenantForm";
import { BlockEdiComponent } from "@/components/shared/BlockEdit";
import { useStaffPrivilegeStore } from "@/store/staff/useStaffStore";

type props = {
  params: {
    id: string;
  };
};

export default function EditTEnantPage({ params: { id } }: props) {
  const { data: staffPrivilege } = useStaffPrivilegeStore();

  const CAN_EDIT = staffPrivilege?.find(
    (item: any) => item.type === "facility"
  )?.can_edit;

  if (!CAN_EDIT) {
    return <BlockEdiComponent />;
  }

  return <EditTenantForm id={id} />;
}
