import { DataTable } from '@/components/shared/DataTable'
import React from 'react'
import { columns } from './columns'
import { data } from './data'
import { useQuery } from "@tanstack/react-query";
import { getStuffTyped } from "@/hooks/useSelectOptions";
import { IMaterialsByProjectData } from "@/utils/types";

const Materials = ({ projectCode }: { projectCode: string }) => {
  const { data, error, isPending } = useQuery({
    queryKey: ["get all materials by project code", projectCode],
    queryFn: async () =>
      getStuffTyped<IMaterialsByProjectData[]>(
        `/materials/project/${projectCode}`
      ),
    refetchOnMount: "always",
  });
  return (
    <div>
      <h2 className="text-[20px] font-[600]">Materials ({data?.length})</h2>
      <DataTable
        showSearch={false}
        isLoading={isPending}
        columns={columns}
        data={data ?? []}
      />
    </div>
  );
};

export default Materials