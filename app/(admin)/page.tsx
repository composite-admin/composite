"use client";

import { DataTable } from "@/components/shared/DataTable";
import { columns } from "./columns";
import { data } from "./data";

import PageHeaderComponent from "@/components/shared/PageHeaderComponent";
import DashboardCard from "@/components/Dashboard/DashboardCard";
import SideCards from "@/components/Dashboard/SideCards";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse, IEntityData } from "@/utils/types";
import { api } from "@/config/api";
import axios from "axios";

export default function DashboardPage() {
  const {
    data: entities,
    error,
    isPending,
  } = useQuery({
    queryKey: ["get all entities"],
    queryFn: async () => {
      try {
        const response = await api.get<ApiResponse<IEntityData>>(
          "/dashboard/entity-count"
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

  return (
    <div>
      <PageHeaderComponent
        title="Welcome, David"
        subTitle="This is your dashboard, an overview of everything going on."
      />
      <div className="grid-cols-1 gap-8 grid xl:grid-cols-8">
        <div className="xl:col-span-6">
          <div className="pb-12 flex gap-5 py-3 md:overflow-x-visible overflow-x-auto hide">
            <DashboardCard
              title="Total Projects"
              description={entities?.totalProject.count}
            />
            <DashboardCard
              title="Total Contracts"
              description={entities?.totalContractor.count}
            />
            <DashboardCard
              title="Total Stakeholders"
              description={entities?.totalStakeholder.count}
            />
          </div>
          <DataTable columns={columns} data={data} showSearch={false} />
        </div>

        <div className="xl:col-span-2 grid md:grid-cols-2 xl:grid-cols-1 gap-5 auto-rows-min  place-items-center w-full">
          <SideCards />
          <SideCards />
        </div>
      </div>
    </div>
  );
}
