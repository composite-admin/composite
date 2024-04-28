"use client";
import { getStuffTyped, useGetClientDetails } from "@/hooks/useSelectOptions";
import EditClientForm from "./EditClientForm";
import { useQuery } from "@tanstack/react-query";
import { IClientDetails } from "@/utils/types";

type Params = {
  params: {
    id: string;
  };
};

export default function EditClientPage({ params }: Params) {
  const { data } = useQuery({
    queryKey: ["get client details", params.id],
    queryFn: () => getStuffTyped<IClientDetails>(`/client/${params.id}`),
    refetchOnMount: "always",
  });
  return <EditClientForm data={data} />;
}
