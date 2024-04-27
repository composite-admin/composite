"use client";
import { DataTable } from '@/components/shared/DataTable'
import PageHead from '@/components/ui/pageHead'
import React from "react";
import { data } from "../data";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { IStakeholderProjectData } from "@/utils/types";
import { getStuffTyped } from "@/hooks/useSelectOptions";

const PendingStakeholderProject = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["get all materials by project code"],
    queryFn: async () =>
      getStuffTyped<IStakeholderProjectData[]>(`/stakeholder-project`),
    refetchOnMount: "always",
  });

  const pendingStakeholders = data?.filter(
    (item) => item.status === "PENDING" || item.status === null
  );

  return (
    <>
      <PageHead
        headText="Pending Stakeholder Project"
        subText="View all your Stakeholders here"
        buttonText="Add Stakeholder"
      />
      <DataTable
        columns={columns}
        data={pendingStakeholders ? pendingStakeholders : []}
        isLoading={isPending}
      />
    </>
  );
};

export default PendingStakeholderProject