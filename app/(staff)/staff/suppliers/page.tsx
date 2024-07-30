"use client";
import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./columns";
import { useRouter } from "next/navigation";
import { useGetAllSuppliers } from "@/hooks/useSelectOptions";
import { useStaffPrivilegeStore } from "@/store/staff/useStaffStore";

export default function SuppliersPage() {
  const router = useRouter();
  const { suppliers, isLoading } = useGetAllSuppliers();
  const { data: staffPrivilege } = useStaffPrivilegeStore();

  const CAN_CREATE = staffPrivilege?.find(
    (item: any) => item.type === "supplier"
  )?.can_create;

  const CAN_VIEW = staffPrivilege?.find(
    (item: any) => item.type === "supplier"
  )?.can_view;

  return (
    <>
      <PageHead
        headText={`Suppliers (${suppliers?.length || 0})`}
        subText="View all your suppliers here"
        buttonText="Add Supplier"
        can_create={CAN_CREATE}
        disabled={!CAN_CREATE}
        buttonAction={() => router.push("/staff/suppliers/add")}
      />
      <DataTable
        columns={columns}
        data={suppliers || []}
        isLoading={isLoading}
      />
    </>
  );
}
