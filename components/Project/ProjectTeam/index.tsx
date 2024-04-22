import { DataTable } from '@/components/shared/DataTable'
import React from 'react'
import { columns } from './columns'
import { data } from './data'
import { useQuery } from "@tanstack/react-query";
import { getStuffTyped } from "@/hooks/useSelectOptions";
import { IProjectTeamMemberByProjectData } from "@/utils/types";

const ProjectTeam = ({ projectCode }: { projectCode: string }) => {
  const { data, error, isPending } = useQuery({
    queryKey: ["get all materials by project code", projectCode],
    queryFn: async () =>
      getStuffTyped<IProjectTeamMemberByProjectData[]>(
        `/project-teams/${projectCode}`
      ),
    refetchOnMount: true,
  });
  return (
    <div>
      <h2 className="font-semibold pt-5 lg:text-2xl">Project Team</h2>
      <DataTable showSearch={false} columns={columns} data={data ?? []} />
    </div>
  );
};

export default ProjectTeam