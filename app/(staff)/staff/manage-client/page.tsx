"use client";

import PageHeaderComponent from "@/components/shared/PageHeaderComponent";
import { DataTable } from "@/components/shared/DataTable";
import useManageClientStore from "@/store/manage-client/useManageClientStore";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse, IClientData } from "@/utils/types";
import axios from "axios";
import { api } from "@/config/api";
import { columns } from "./columns";
import { useStaffPrivilegeStore } from "@/store/staff/useStaffStore";

export default function ManageClientPage() {
  const { setClientData, clientData, setTableData, tableData } =
    useManageClientStore();
  const { data: staffPrivilege } = useStaffPrivilegeStore();

  const CAN_CREATE = staffPrivilege?.find(
    (item: any) => item.type === "client"
  )?.can_create;
  const { data, error, isPending } = useQuery({
    queryKey: ["get all clients"],
    queryFn: async () => {
      try {
        const response = await api.get<ApiResponse<IClientData[]>>("/client");
        setClientData(response.data.data);
        setTableData(response.data.data);
        return response.data.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message);
        } else {
          throw error;
        }
      }
    },

    refetchOnMount: "always",
  });

  return (
    <div className="space-y-8">
      <div>
        <PageHeaderComponent
          title={`Client (${clientData?.length || 0})`}
          subTitle="View all client here"
          buttonText="Add Client"
          disabled={!CAN_CREATE}
          href="manage-client/add-new-client"
        />
      </div>
      <DataTable
        columns={columns}
        isLoading={isPending}
        data={clientData || []}
      />
    </div>
  );
}
