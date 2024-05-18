"use client";
import EditClientForm from "./EditClientForm";
import useManageClientStore from "@/store/manage-client/useManageClientStore";

type Params = {
  params: {
    id: string;
  };
};

export default function EditClientPage({ params }: Params) {
  const { clientDetailsData } = useManageClientStore();

  return <EditClientForm data={clientDetailsData} />;
}
