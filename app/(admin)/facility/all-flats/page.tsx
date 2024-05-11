"use client";
import { DataTable } from "@/components/shared/DataTable";
import PageHeaderComponent from "@/components/shared/PageHeaderComponent";
import { columns } from "./columns";
import useFacilityStore from "@/store/facility/useFacilityStore";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/config/api";
import { ApiResponse, IFlatData } from "@/utils/types";
import axios from "axios";
import { useAddNewApartmentModal } from "@/store/modals/useCreateModal";

export default function AllFlatsPage() {
  const { setFlatData, setFlatFormType } = useFacilityStore();
  const { onOpen } = useAddNewApartmentModal();
  const AddAppartment = () => {
    setFlatFormType("add");
    onOpen();
  };
  const { data, isPending } = useQuery({
    queryKey: ["get all tenants"],
    queryFn: async () => {
      try {
        const response = await api.get<ApiResponse<IFlatData[]>>(
          "/project-flats"
        );
        setFlatData(response.data.data);
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
      <PageHeaderComponent
        title="All Flats"
        subTitle="View all flats here"
        buttonText="Add Apartment"
        onclick={AddAppartment}
      />
      <DataTable columns={columns} data={data ?? []} isLoading={isPending} />
    </>
  );
}
