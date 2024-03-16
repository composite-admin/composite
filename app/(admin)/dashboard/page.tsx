// import { DataTable } from "@/components/data-table";
import { DataTable } from "@/components/shared/DataTable";
import { columns } from "./columns";
import { data } from "./data";

export default function DashboardPage() {
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
