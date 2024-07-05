"use client"
import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { useInventoryDetails } from "@/store/inventory/UseInventoryModal";
import { columns } from "./columns";
// import { data } from "./data";
import { useRouter } from "next/navigation";
import useFetchInventoryData from "@/mutations/InventoryMutation";
import useGetAllInventory from "@/store/inventory/InventoryStore";
import { useEffect, useState } from "react";
import { HiHome, HiOutlineClock, HiPlus } from "react-icons/hi2";

export default function InventoryPage() {
  const onOpen = useInventoryDetails((state) => state.onOpen);
  const router = useRouter();

  const { action, isError, isSuccess, error } = useFetchInventoryData();

  const { inventoryData } = useGetAllInventory();

  useEffect(() => {
    action();
  }, [action]);

  const [data, setData] = useState<any[]>([]);
  const [originalData, setOriginalData] = useState<any[]>([]);

  useEffect(() => {
    setData(inventoryData);
    setOriginalData(inventoryData);
  }, [inventoryData]);

  const filter = (type: string) => {
    if (type === "All") {
      setData(originalData);
    } else {
      const filteredData = originalData.filter((item) => item.type === type);
      setData(filteredData);
    }
  };
  const getCountByType = (type: string) => {
    return originalData.filter((item) => item.type === type).length;
  };
  return (
    <>
      <PageHead
        headText={`Inventories (${data?.length || 0})`}
        subText="View all your inventories here"
        buttonText="Add Inventory"
        buttonAction={() => router.push("/inventory/new")}
      />
      {/* <DataTable columns={columns} data={data} clickAction={()=> onOpen()}/> */}

      <div className="flex gap-3 my-5">
        <div
          className="bg-[#007BFF08] text-sm rounded-md flex items-center p-3 gap-1 cursor-pointer"
          onClick={() => filter("All")}
        >
          <HiPlus className="text-primaryLight" />
          <p>All Inventories</p>
        </div>

        <div
          className="bg-[#E7F6EC] text-sm rounded-md flex items-center p-3 gap-1 cursor-pointer"
          onClick={() => filter("Equipment")}
        >
          <HiOutlineClock className="text-[#036B26]" />
          <p className="text-[#036B26]">
            Equipment ({getCountByType("Equipment")})
          </p>
        </div>

        <div
          className="bg-[#f4efdb] text-sm rounded-md flex items-center p-3 gap-1 cursor-pointer"
          onClick={() => filter("Material")}
        >
          <HiOutlineClock className="text-[#7b6a25]" />
          <p className="text-[#7b6a25]">
            Material ({getCountByType("Material")})
          </p>
        </div>

        <div
          className="bg-[#FEF6E7] text-sm rounded-md flex items-center p-3 gap-1 cursor-pointer"
          onClick={() => filter("Tools")}
        >
          <HiHome className="text-[#865503]" />
          <p className="text-[#865503]">Tools ({getCountByType("Tools")})</p>
        </div>

        <div
          className="bg-[#FFECE5] text-sm rounded-md flex items-center p-3 gap-1 cursor-pointer"
          onClick={() => filter("Machinery")}
        >
          <HiHome className="text-[#8A0000]" />
          <p className="text-[#8A0000]">
            Machinery ({getCountByType("Machinery")})
          </p>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={data || []}
        isLoading={!inventoryData}
      />
    </>
  );
}
