"use client";
import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import React from "react";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/config/api";
import axios from "axios";
import { ApiResponse, ITenantData } from "@/utils/types";
import GoBack from "@/components/shared/GoBack";

interface Params {
  params: {
    id: string;
  };
}

const TenantPage = ({ params }: Params) => {
  const code = params.id;
  const { data, error, isPending } = useQuery({
    queryKey: ["get all project tenants"],
    queryFn: async () => {
      try {
        const response = await api.get<ApiResponse<ITenantData[]>>(
          `/tenants/project/${code}`
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
      <GoBack />
      <PageHead
        headText={`Tenants (${data?.length || 0})`}
        subText="View tenants for this project here"
      />
      <DataTable columns={columns} data={data || []} isLoading={isPending} />
    </>
  );
};

export default TenantPage;
