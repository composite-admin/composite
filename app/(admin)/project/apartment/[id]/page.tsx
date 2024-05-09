"use client";
import { DataTable } from "@/components/shared/DataTable";
import GoBack from "@/components/shared/GoBack";
import PageHead from "@/components/ui/pageHead";
import React from "react";
import { columns } from "./columns";
import { data } from "./data";
import { useQuery } from "@tanstack/react-query";
import { getStuffTyped } from "@/hooks/useSelectOptions";
import { useProjectDetailsPageFormModal } from "@/store/project/useProjectModal";

export interface IProjectFlatData {
  flat_id: number;
  flate_code: string;
  flat_desc: string;
}

interface IProps {
  params: { id: string };
}

const ApartmentPage = ({ params }: IProps) => {
  const code = params.id;
  const { projectCode } = useProjectDetailsPageFormModal();

  const { data, error, isPending } = useQuery({
    queryKey: ["get all materials by project code", projectCode],
    queryFn: async () =>
      getStuffTyped<IProjectFlatData[]>(
        `/project-flats/project-code/code?project_code=${projectCode}`
      ),
    refetchOnMount: "always",
  });
  return (
    <>
      {/* <GoBack /> */}
      <PageHead
        headText="View Apartment"
        subText="See all apartment details here"
      />
      <DataTable columns={columns} data={data ?? []} isLoading={isPending} />
    </>
  );
};

export default ApartmentPage;
