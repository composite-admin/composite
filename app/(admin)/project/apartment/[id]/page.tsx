"use client";
import { DataTable } from "@/components/shared/DataTable";
import GoBack from "@/components/shared/GoBack";
import PageHead from "@/components/ui/pageHead";
import React, { useEffect } from "react";
import { columns } from "./columns";
import { data } from "./data";
import { useQuery } from "@tanstack/react-query";
import { getStuffTyped } from "@/hooks/useSelectOptions";
import { useProjectDetailsPageFormModal } from "@/store/project/useProjectModal";
import { useAddNewApartmentModal } from "@/store/modals/useCreateModal";
import useFacilityStore from "@/store/facility/useFacilityStore";

export interface IProjectFlatData {
  flat_id: number;
  flat_code: string;
  flat_desc: string;
  comment?: string;
  updatedAt?: string;
}

interface IProps {
  params: { id: string };
}

const ApartmentPage = ({ params }: IProps) => {
  const code = params.id;
  const { setFlatData, setFlatFormType } = useFacilityStore();
  const { setFlatProjectCode } = useProjectDetailsPageFormModal();
  const { onOpen } = useAddNewApartmentModal();
  const AddAppartment = () => {
    setFlatFormType("add");
    onOpen();
  };

  useEffect(() => {
    setFlatProjectCode(code);
  }, [code]);

  const { data, error, isPending } = useQuery({
    queryKey: ["get all materials by project code", code],
    queryFn: async () =>
      getStuffTyped<IProjectFlatData[]>(
        `/project-flats/project-code/code?project_code=${code}`
      ),
    enabled: !!code,
  });
  return (
    <>
      <GoBack />
      <PageHead
        headText={`View Apartment (${data?.length || 0})`}
        subText="See all apartment details here"
        buttonText="Add Apartment"
        buttonAction={AddAppartment}
      />
      <DataTable
        columns={columns}
        data={data ?? []}
        isLoading={isPending}
      />
    </>
  );
};

export default ApartmentPage;
