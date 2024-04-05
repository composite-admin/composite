"use client";
import PageHeaderComponent from "@/components/shared/PageHeaderComponent";
import { DataTable } from "@/components/shared/DataTable";
import SelectTableTypeBadge from "@/components/shared/SelectTableTypeBadge";
import { DashboardIcon } from "@/components/icons";
import { columns } from "./columns";
import useFacilityStore from "@/store/facility/useFacilityStore";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse, ITenantData } from "@/utils/types";
import axios from "axios";
import { api } from "@/config/api";

export default function FacilityPage() {
  const { setTenantData, tenantData } = useFacilityStore();

  const { data, error, isPending } = useQuery({
    queryKey: ["get all tenants"],
    queryFn: async () => {
      try {
        const response = await api.get<ApiResponse<ITenantData[]>>("/tenants");
        setTenantData(response.data.data);
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
  return (
    <div>
      <div>
        <PageHeaderComponent
          title="Tenants"
          subTitle="A request of daily, weekly and monthly activities"
          buttonText="Add new apartment"
          href="facility/add-tenant"
          className="py-7"
        />
      </div>
      <div className="flex gap-3 py-5">
        <SelectTableTypeBadge
          icon={<DashboardIcon />}
          title="Approved IOU/Refund"
          notification="2"
        />
        <SelectTableTypeBadge
          icon={<DashboardIcon />}
          title="Pending IOU/Refund"
          notification="3"
        />
      </div>
      <DataTable columns={columns} data={tenantData ?? []} />
    </div>
  );
}
