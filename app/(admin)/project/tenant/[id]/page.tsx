"use client";
import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import React from "react";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/config/api";
import axios from "axios";
import { ApiResponse, ITenantData } from "@/utils/types";

const TenantPage = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["get all project tenants"],
    queryFn: async () => {
      try {
        const response = await api.get<ApiResponse<ITenantData[]>>(
          "/tenants/project/proj-6033"
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
    <>
      <PageHead
        headText="Tenant"
        subText="A request for daily, weekly and monthly activities"
      />
      <DataTable columns={columns} data={data || []} isLoading={isPending} />
    </>
  );
};

export default TenantPage;
