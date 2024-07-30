"use client";
import ConsultantForm from "@/components/forms/ConsultantForm";
import GoBack from "@/components/shared/GoBack";
import { api } from "@/config/api";
import { IConsultantDetailsData } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import EditConsultantForm from "./EditConsultantForm";
import { useStaffPrivilegeStore } from "@/store/staff/useStaffStore";
import { BlockEdiComponent } from "../../../suppliers/[id]/edit/page";

type Params = {
  params: {
    id: string;
  };
};

export default function EditConsultantPage({ params }: Params) {
  const { data: staffPrivilege } = useStaffPrivilegeStore();

  const CAN_EDIT = staffPrivilege?.find(
    (item: any) => item.type === "consultant"
  )?.can_edit;
  const { data, isPending, error } = useQuery({
    queryKey: ["get consultant details"],
    queryFn: async () => {
      try {
        const response = await api.get<IConsultantDetailsData>(
          `/consultants/${params.id}`
        );

        return response.data.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message);
        } else {
          throw error;
        }
      }
    },
  });

  if (!CAN_EDIT) {
    return <BlockEdiComponent />;
  }

  return (
    <div>
      <div>
        <GoBack />
      </div>
      <div>{data && <EditConsultantForm data={data} />}</div>
    </div>
  );
}
