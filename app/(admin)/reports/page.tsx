import { DataTable } from "@/components/shared/DataTable";
import { columns } from "./columns";
import { data } from "./data";
import PageHead from "@/components/ui/pageHead";

export default function ReportPage() {
  return (
    <div>
      <PageHead headText="Report" subText="A report of daily, weekly and monthly activities" buttonText="Add Report" />
      <DataTable columns={columns} data={data}  />
    </div>
  );
}
