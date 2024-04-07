
"use client";
import { DataTable } from "@/components/shared/DataTable";
import PageHeaderComponent from "@/components/shared/PageHeaderComponent";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { getAllrequest } from "@/store/requests/RequestStore";
export default function ReportPage() {
  const { data, error, isPending } = useQuery({
    queryKey: ["get all tenants"],
    queryFn: getAllrequest,
  });
  return (
    <>
      <PageHeaderComponent
        subTitle="A request of daily, weekly and monthly activites"
        title="Request"
      />
      <DataTable columns={columns} isLoading={isPending} data={data ?? []} />
    </>
  );
}
