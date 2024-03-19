"use client";
import { DataTable } from "@/components/shared/DataTable";
import { columns } from "./columns";
import { data } from "./data";
import PageHead from "@/components/ui/pageHead";
import { useRouter } from "next/navigation";

export default function ReportPage() {
  const router = useRouter();

export default function ReportPage() {
  return (
    <div>
      <PageHead headText="Report" subText="A report of daily, weekly and monthly activities" buttonText="Add Report" buttonAction={()=> router.push("/reports/new")} />
      <DataTable columns={columns} data={data}  />
    </div>
  );
}
