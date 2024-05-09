import { DataTable } from '@/components/shared/DataTable'
import React from 'react'
import { columns } from './columns'
import { data } from './data'
import { useQuery } from "@tanstack/react-query";
import { api } from "@/config/api";
import { ApiResponse, IContractorProjectData } from "@/utils/types";
import axios from "axios";

const Contractor = ({ projectCode }: { projectCode: string }) => {
  const { data, error, isPending } = useQuery({
    queryKey: ["get all contractors by project code"],
    queryFn: async () => {
      try {
        const response = await api.get<ApiResponse<IContractorProjectData[]>>(
          `/contractor-projects/project-code/${projectCode}`
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
    refetchOnMount: "always",
  });

  return (
    <div>
      <h2 className="text-[20px] font-[600]">Contractor</h2>
      <DataTable
        showSearch={false}
        isLoading={isPending}
        columns={columns}
        data={data ?? []}
      />
    </div>
  );
};

export default Contractor