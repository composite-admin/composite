"use client";
import { DataTable } from '@/components/shared/DataTable'
import PageHead from '@/components/ui/pageHead'
import React from 'react'
import { columns } from './columns'
import { data } from './data'
import { useQuery } from "@tanstack/react-query";
import { getStuffTyped } from "@/hooks/useSelectOptions";
import { IContractorProjectData } from "@/utils/types";

const PendingProject = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["get all materials by project code"],
    queryFn: async () =>
      getStuffTyped<IContractorProjectData[]>(`/contractor-projects`),
    refetchOnMount: true,
  });

  const pendingContractors = data?.filter(
    (item) => item.status === "Pending" || item.status === null
  );

  return (
    <>
      <PageHead
        headText="Pending Contractor Project"
        subText="View all your contractors here"
        buttonText="Add Contractor"
      />
      <DataTable
        columns={columns}
        data={pendingContractors ?? []}
        isLoading={isPending}
      />
    </>
  );
};

export default PendingProject;

