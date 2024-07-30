"use client";

import GoBack from "@/components/shared/GoBack";
import { testdata } from "@/utils/contents";
import GridDetailsComponent from "@/components/shared/GridDetailsComponent";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { Button } from "@/components/ui/button";
import EditStaffForm from "./EditStaffForm";
import { useQuery } from "@tanstack/react-query";
import { IStaffDetailsData } from "@/utils/types";
import { getStuffTyped } from "@/hooks/useSelectOptions";
import { useStaffPrivilegeStore } from "@/store/staff/useStaffStore";
import { BlockEdiComponent } from "@/components/shared/BlockEdit";

export default function EditStaffPage({ params }: { params: { id: string } }) {
  const { data: staffPrivilege } = useStaffPrivilegeStore();

  const CAN_EDIT = staffPrivilege?.find(
    (item: any) => item.type === "staff"
  )?.can_edit;
  const { data } = useQuery({
    queryKey: ["get client details", params.id],
    queryFn: () => getStuffTyped<IStaffDetailsData>(`/staffs/${params.id}`),
    refetchOnMount: "always",
  });

  if (!CAN_EDIT) {
    return <BlockEdiComponent />;
  }

  return <EditStaffForm data={data} />;
}
