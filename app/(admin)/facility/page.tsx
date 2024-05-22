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
import UpComingDueDates from "@/components/facility/upcomingDueDates/UpComingDueDates";

export default function FacilityPage() {
  const { setTenantData, dueDatesData, currentTable, setCurrentTable } =
    useFacilityStore();

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
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
  });

  return (
    <div>
      <div>
        <PageHeaderComponent
          title="Tenants"
          subTitle="A request of daily, weekly and monthly activities"
          buttonText="Add new tenant"
          href="facility/add-tenant"
          className="py-7"
        />
      </div>
      <div className="flex gap-3 py-5">
        <SelectTableTypeBadge
          icon={<DashboardIcon />}
          onclick={() => setCurrentTable("all_tenants")}
          title="All Tenants"
          notification={data?.length ?? 0}
          className={`${
            currentTable === "all_tenants" ? "bg-primaryLight-100" : ""
          }
          `}
        />
        <SelectTableTypeBadge
          onclick={() => setCurrentTable("upcoming_due_dates")}
          icon={<DashboardIcon />}
          title="Upcoming Due Dates"
          notification={dueDatesData?.length ?? 0}
          className={`${
            currentTable === "upcoming_due_dates" ? "bg-primaryLight-100" : ""
          }`}
        />
      </div>

      {currentTable === "all_tenants" ? (
        <DataTable columns={columns} isLoading={isPending} data={data ?? []} />
      ) : (
        <UpComingDueDates />
      )}
    </div>
  );
}
