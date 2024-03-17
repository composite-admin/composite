import { DataTable } from "@/components/shared/DataTable";
import { columns } from "./columns";
import { data } from "./data";

export default function page() {
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
