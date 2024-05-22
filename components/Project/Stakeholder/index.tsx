import { DataTable } from '@/components/shared/DataTable'
import React from 'react'
import { columns } from './columns'
import { useQuery } from "@tanstack/react-query";
import { api } from "@/config/api";
import { ApiResponse, IStakeholderProjectData } from "@/utils/types";
import axios from "axios";

const Stakeholder = ({ projectCode }: { projectCode: string }) => {
  const { data, error, isPending } = useQuery({
    queryKey: ["get stakeholders by project code"],
    queryFn: async () => {
      try {
        const response = await api.get<ApiResponse<IStakeholderProjectData[]>>(
          `/stakeholder-project/project-code/${projectCode}`
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
      <h2 className="text-[20px] font-[600]">Stakeholder</h2>
      <DataTable
        showSearch={false}
        isLoading={isPending}
        columns={columns}
        data={data ?? []}
      />
    </div>
  );
};

export default Stakeholder