import { DataTable } from '@/components/shared/DataTable'
import React from 'react'
import { columns } from './columns'
import { data } from './data'
import { useQuery } from "@tanstack/react-query";
import { getStuffTyped } from "@/hooks/useSelectOptions";
import { IWorkerByProjectData } from "@/utils/types";

const Worker = ({ projectCode }: { projectCode: string }) => {
  const { data, error, isPending } = useQuery({
    queryKey: ["get all workers by project code", projectCode],
    queryFn: async () =>
      getStuffTyped<IWorkerByProjectData[]>(
        `/worker-projects/project-code/${projectCode}`
      ),
    refetchOnMount: "always",
  });

  return (
    <div>
      <h2 className="text-[20px] font-[600]">Worker</h2>
      <DataTable
        showSearch={false}
        columns={columns}
        isLoading={isPending}
        data={data ?? []}
      />
    </div>
  );
};

export default Worker