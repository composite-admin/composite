"use client";
import GoBack from "@/components/shared/GoBack";
import ViewDetails from "@/components/shared/ViewDetails";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import keys from "../keys";
import useFetchEachInventoryData from "@/mutations/EachInventoryMutation";
import { useGetEachinventory } from "@/store/inventory/InventoryStore";
import { useStaffPrivilegeStore } from "@/store/staff/useStaffStore";

const Page = (props: any) => {
  const router = useRouter();

  let id: any = props.params.id;
  const { data: staffPrivilege } = useStaffPrivilegeStore();

  const CAN_EDIT = staffPrivilege?.find(
    (item: any) => item.type === "inventory"
  )?.can_edit;

  const { action } = useFetchEachInventoryData();

  const { singleInventoryData } = useGetEachinventory();

  useEffect(() => {
    action(id);
  }, [action, id]);

  const [data, setData] = useState<any>({});

  useEffect(() => {
    setData(singleInventoryData);
  }, [singleInventoryData]);

  return (
    <>
      <GoBack />

      <ViewDetails
        title="Inventory Details"
        can_edit={CAN_EDIT}
        dateSubmitted="6th July, 2023"
        editAction={() => {
          router.push(`/staff/inventory/${id}/update`);
        }}
        keys={keys}
        data={data}
      />
    </>
  );
};

export default Page;
