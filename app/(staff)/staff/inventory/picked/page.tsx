"use client";

import { DataTable } from "@/components/shared/DataTable";
import GoBack from "@/components/shared/GoBack";
import PageHead from "@/components/ui/pageHead";
import React from "react";
import { columns } from "./columns";
import { data } from "./data";
import { useGetAllRequests } from "@/hooks/useSelectOptions";

const PickedFromStore = () => {
  const { requests } = useGetAllRequests();
  const itemsFromStore = requests?.filter(
    (request) =>
      request.request_type.includes("Store") && request.status === "APPROVED"
  );

  return (
    <>
      <GoBack />
      <PageHead
        headText="Items Picked from Store"
        subText="View all your items here"
      />
      <DataTable columns={columns} data={itemsFromStore ?? []} />
    </>
  );
};

export default PickedFromStore;
