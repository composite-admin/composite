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

export default function EditStaffPage({ params }: { params: { id: string } }) {
  const { data } = useQuery({
    queryKey: ["get client details", params.id],
    queryFn: () => getStuffTyped<IStaffDetailsData>(`/staffs/${params.id}`),
    refetchOnMount: "always",
  });
  return <EditStaffForm data={data} />;

}
