"use client";
import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./columns";
import { useRouter } from "next/navigation";
import { useGetAllSuppliers } from "@/hooks/useSelectOptions";


export default function SuppliersPage() {
  const router = useRouter();
  const { suppliers, isLoading } = useGetAllSuppliers();

  return (
    <>
      <PageHead
        headText={`Suppliers (${suppliers?.length || 0})`}
        subText="View all your suppliers here"
        buttonText="Add Supplier"
        buttonAction={() => router.push("/suppliers/add")}
      />
      <DataTable
        columns={columns}
        data={suppliers || []}
        isLoading={isLoading}
      />
    </>
  );
}
